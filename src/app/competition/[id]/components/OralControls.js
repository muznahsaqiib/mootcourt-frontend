'use client';

import { useState, useRef } from 'react';

export default function OralControls({ sessionId, nextTurn, submitOralTurn }) {
    const [recording, setRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                audioChunks.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                setSubmitting(true);
                const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
                try {
                    const data = await submitOralTurn(blob);
                    if (data) setTranscribedText(data.transcribed_text || '');
                } catch (err) {
                    console.error('Audio submission failed:', err);
                } finally {
                    setSubmitting(false);
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Record button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {!recording ? (
                    <button
                        onClick={startRecording}
                        disabled={submitting}
                        style={{
                            flex: 1, padding: '12px 20px',
                            borderRadius: 5, cursor: submitting ? 'not-allowed' : 'pointer',
                            border: '2px solid #c9a227',
                            background: '#c9a22718',
                            color: '#f0c84a',
                            fontSize: 15, fontWeight: 700, letterSpacing: 2,
                            fontFamily: "'Cinzel', serif",
                            opacity: submitting ? 0.45 : 1,
                            transition: 'all 0.15s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        }}
                        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = '#c9a22730'; e.currentTarget.style.borderColor = '#f0c84a'; } }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#c9a22718'; e.currentTarget.style.borderColor = '#c9a227'; }}
                    >
                        <span style={{ fontSize: 18 }}>🎙</span>
                        {submitting ? 'PROCESSING…' : 'BEGIN ORAL SUBMISSION'}
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        style={{
                            flex: 1, padding: '12px 20px',
                            borderRadius: 5, cursor: 'pointer',
                            border: '2px solid #e05555',
                            background: '#e0555518',
                            color: '#ff7070',
                            fontSize: 15, fontWeight: 700, letterSpacing: 2,
                            fontFamily: "'Cinzel', serif",
                            transition: 'all 0.15s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            animation: 'recordPulse 1.5s ease infinite',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#e0555530'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#e0555518'; }}
                    >
                        {/* Pulsing red dot */}
                        <span style={{
                            width: 10, height: 10, borderRadius: '50%',
                            background: '#ff4444',
                            boxShadow: '0 0 8px #ff4444',
                            display: 'inline-block',
                            animation: 'pulse 1s infinite',
                        }} />
                        STOP &amp; SUBMIT
                    </button>
                )}
            </div>

            {/* Recording indicator */}
            {recording && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 12px', borderRadius: 4,
                    background: '#e0444410', border: '1px solid #e0444430',
                }}>
                    <span style={{ fontSize: 12, color: '#e05555', fontFamily: "'Cinzel', serif", letterSpacing: 1.5 }}>
                        ● RECORDING IN PROGRESS — SPEAK CLEARLY
                    </span>
                </div>
            )}

            {/* Transcription result */}
            {transcribedText && !recording && (
                <div style={{
                    padding: '10px 14px', borderRadius: 5,
                    background: '#1c1610', border: '1px solid #3a2a10',
                    animation: 'fadeIn 0.3s ease',
                }}>
                    <span style={{
                        fontSize: 11, color: '#c9a227', letterSpacing: 2,
                        fontFamily: "'Cinzel', serif", fontWeight: 700,
                        display: 'block', marginBottom: 5,
                    }}>
                        TRANSCRIBED
                    </span>
                    <p style={{
                        fontSize: 15, lineHeight: 1.65,
                        color: '#d8c898',
                        fontFamily: "'EB Garamond', Georgia, serif",
                    }}>
                        {transcribedText}
                    </p>
                </div>
            )}

            <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
        </div>
    );
}