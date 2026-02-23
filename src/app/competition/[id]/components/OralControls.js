'use client';

import { useState, useRef } from 'react';

export default function OralControls({ sessionId, submitUserTurn }) {
    const [recording, setRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            audioChunks.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const blob = new Blob(audioChunks.current, { type: 'audio/webm' });

                const formData = new FormData();
                formData.append("file", blob);
                formData.append("session_id", sessionId);

                try {
                    const res = await fetch(
                        `http://localhost:8000/moot/petitioner/argument/audio`,
                        {
                            method: "POST",
                            body: formData,
                            credentials: "include",
                        }
                    );

                    if (!res.ok) {
                        throw new Error(`Server error: ${res.status}`);
                    }

                    const data = await res.json();

                    const text = data.transcribed_text || '';
                    setTranscribedText(text);

                    // 🔥 Update transcript using your existing logic
                    if (text) {
                        await submitUserTurn(text);
                    }

                    // 🎧 Play Judge audio
                    if (data.judge_audio) {
                        const judgeAudio = new Audio(`data:audio/wav;base64,${data.judge_audio}`);
                        judgeAudio.play();
                    }

                    // 🎧 Play Respondent audio
                    if (data.respondent_audio) {
                        const respondentAudio = new Audio(`data:audio/wav;base64,${data.respondent_audio}`);
                        respondentAudio.play();
                    }

                } catch (err) {
                    console.error('Audio submission failed:', err);
                }
            };

            mediaRecorderRef.current.start();
            setRecording(true);

        } catch (err) {
            console.error('Could not start recording:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                {!recording ? (
                    <button
                        onClick={startRecording}
                        className="px-6 py-3 bg-rose-400 text-white rounded-2xl"
                    >
                        🎙 Start Speaking
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        className="px-6 py-3 bg-stone-700 text-white rounded-2xl"
                    >
                        ⏹ Stop & Submit
                    </button>
                )}
            </div>

            {transcribedText && (
                <div className="mt-2 p-2 bg-stone-100 rounded-md text-stone-800">
                    <strong>Transcribed:</strong> {transcribedText}
                </div>
            )}
        </div>
    );
}