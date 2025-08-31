'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/styles';
import { motion } from 'framer-motion';
import BackgroundParticles from '@/components/BackgroundParticles';

export default function AboutPage() {
    const visionRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const section = searchParams.get('section');
        switch (section) {
            case 'vision':
                visionRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about':
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }, [searchParams]);

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <BackgroundParticles/>
            {/* Our Vision */}
            <motion.section
                ref={visionRef}
                className="h-screen flex flex-col justify-center items-center p-10 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-bold mb-6 text-center text-rose-600">Our Vision</h2>
                <p className="max-w-3xl text-center text-lg text-gray-700 leading-relaxed">
                    "Revolutionizing Legal Education Through Immersive Technology"
                </p>
                <p className="max-w-3xl mt-4 text-center text-gray-600">
                    We envision a future where legal training is accessible, interactive, and technologically advanced.
                    Our AI-Powered Moot Court in Virtual Reality project bridges the gap between theoretical law education and practical courtroom experience,
                    integrating AI-driven argument evaluation, dynamic judge simulation, and immersive VR interactions.
                    Our goal is to empower aspiring lawyers with confidence, analytical skills, and real-time decision-making capabilities,
                    making legal education engaging, effective, and globally competitive.
                </p>
            </motion.section>

            {/* About Us */}
            <motion.section
                ref={aboutRef}
                className="h-screen flex flex-col justify-center items-center p-10 bg-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-bold mb-6 text-center text-rose-600">About Us</h2>
                <p className="max-w-4xl text-center text-lg text-gray-700 leading-relaxed">
                    "Blending AI, VR, and Legal Expertise"
                </p>

                <div className="mt-6 max-w-4xl text-gray-700 text-lg space-y-4">
                    <p><strong className="text-rose-500">Team Members:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li><strong>Muznah Saqib</strong> </li>
                       
                    </ul>

                    <p><strong className="text-rose-500">Project Highlights:</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>AI acts as <strong>opposing counsel</strong>, <strong>judge</strong>, and <strong>evaluator</strong>.</li>
                        <li>Real-time <strong>voice interaction</strong> powered by STT & TTS.</li>
                        <li>Fully <strong>immersive VR courtroom</strong> environment built in Unity3D.</li>
                        <li>Tailored for realistic legal scenarios with global adaptability.</li>
                        <li>Ideal for <strong>legal education, training, and competitions</strong>.</li>
                    </ul>

                    <p className="mt-4 text-gray-600">We leverage fine-tuned LLMs, NLP task routing, and immersive VR to create an interactive learning environment, transforming how students practice, learn, and excel in law.</p>
                </div>
            </motion.section>

            {/* Contact Us */}
            <motion.section
                ref={contactRef}
                className="h-screen flex flex-col justify-center items-center p-10 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-bold mb-6 text-center text-rose-600">Contact Us</h2>
                <p className="max-w-3xl text-center text-lg text-gray-700 leading-relaxed">
                    Get in touch, collaborate, or follow our journey!
                </p>

                <div className="mt-6 text-center text-gray-700 space-y-3">
                    <p><strong>Email:</strong> <a href="aimootcourt2025@hotmail.com" className="text-rose-500 hover:underline transition">aimootcourt2025@hotmail.com</a></p>
                    <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/your-linkedin" target="_blank" className="text-rose-500 hover:underline transition">linkedin.com/in/your-linkedin</a></p>

                    <div className="flex justify-center gap-6 mt-4 text-rose-500">
                        <a href="https://github.com" target="_blank" className="hover:text-rose-400 transition"><i className="pi pi-github text-2xl" /></a>
                        <a href="https://twitter.com" target="_blank" className="hover:text-rose-400 transition"><i className="pi pi-twitter text-2xl" /></a>
                        <a href="https://linkedin.com" target="_blank" className="hover:text-rose-400 transition"><i className="pi pi-linkedin text-2xl" /></a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
