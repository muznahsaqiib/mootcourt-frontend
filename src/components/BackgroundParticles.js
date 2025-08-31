"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    if (!init) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
            }}
        >
            <Particles
                id="emoji-particles"
                options={{
                    fullScreen: { enable: false },
                    particles: {
                        number: { value: 25 },
                        shape: {
                            type: "character",
                            character: [
                                { value: "⚖️" },
                                { value: "📜" },
                                { value: "⚔️" },
                                { value: "🏛️" },
                            ],
                        },
                        size: { value: 20 },
                        move: {
                            enable: true,
                            speed: 1.5,
                            direction: "none",
                            outModes: { default: "out" },
                        },
                        opacity: { value: 0.8 },
                    },
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: "repulse" },
                        },
                        modes: { repulse: { distance: 100 } },
                    },
                }}
            />
        </div>
    );
}
