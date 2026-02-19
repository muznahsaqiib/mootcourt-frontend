'use client';

import { useState, useRef } from 'react';

export default function OralControls({ sessionId, submitUserTurn }) {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
            audioChunks.current = [];

            const formData = new FormData();
            formData.append("file", blob);

            try {
                const res = await fetch(
                    `http://localhost:8000/moot/petitioner/argument/audio?session_id=${sessionId}`,
                    { method: "POST", body: formData, credentials: "include" }
                );

                const data = await res.json();
                console.log('Transcribed Text:', data.transcribed_text);

                // Auto-play AI response if available
                if (data.respondent_audio_file) {
                    const audio = new Audio(`http://localhost:8000/${data.respondent_audio_file}`);
                    audio.play();
                }
            } catch (err) {
                console.error(err);
            }
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    return (
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
    );
}
