'use client';

/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Head from 'next/head';

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
        <>
            <Head>
                <title>About | AI Legal Evaluator</title>
                <meta
                    name="description"
                    content="Learn about AI Legal Evaluator — founded by Muhammad Hasan to revolutionize legal evaluation, argument scoring, and courtroom analysis through AI."
                />
                <meta
                    name="keywords"
                    content="AI Legal Evaluator, LegalTech, AI law, case analysis, Muhammad Hasan, argument evaluator"
                />
            </Head>

            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                {/* ===== Vision Section ===== */}
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
                        "Empowering Legal Excellence Through Artificial Intelligence"
                    </p>
                    <p className="max-w-3xl mt-4 text-center text-gray-600">
                        At <strong>AI Legal Evaluator</strong>, our vision is to transform how legal reasoning is understood, assessed, and improved.
                        We believe in creating an ecosystem where lawyers, students, and judges can rely on intelligent systems
                        for analytical insight, fairness, and innovation in the justice process.
                    </p>
                </motion.section>

                {/* ===== About Us Section ===== */}
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
                        "Where AI Meets Legal Insight"
                    </p>

                    <div className="mt-6 max-w-4xl text-gray-700 text-lg space-y-4">
                        <p><strong className="text-rose-500">Founder:</strong></p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong>Muhammad Hasan</strong> — Computer Engineer &amp; Founder of AI Legal Evaluator</li>
                        </ul>

                        <p><strong className="text-rose-500">What We Do:</strong></p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Build AI systems that <strong>evaluate and score legal arguments</strong> for clarity, logic, and persuasiveness.</li>
                            <li>Assist <strong>law firms and students</strong> in improving advocacy and analytical reasoning.</li>
                            <li>Use <strong>Natural Language Processing (NLP)</strong> to analyze tone, structure, and legal soundness.</li>
                            <li>Power <strong>AI-based moot court simulations</strong> for law education and training.</li>
                        </ul>

                        <p className="mt-4 text-gray-600">
                            Our goal is to redefine legal evaluation through intelligent automation, empowering
                            the next generation of lawyers and researchers to make smarter, evidence-driven decisions.
                        </p>
                    </div>
                </motion.section>

                {/* ===== Contact Section ===== */}
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
                        Connect with us for collaborations, partnerships, or inquiries.
                    </p>

                    <div className="mt-6 text-center text-gray-700 space-y-3">
                        <p><strong>Email:</strong> <a href="mailto:ailegalevaluator@gmail.com" className="text-rose-500 hover:underline transition">ailegalevaluator@gmail.com</a></p>
                        <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/muhammad-hasan" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline transition">linkedin.com/in/muhammad-hasan</a></p>

                        <div className="flex justify-center gap-6 mt-4 text-rose-500">
                            <a href="https://github.com/Hasan105" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition"><i className="pi pi-github text-2xl" /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition"><i className="pi pi-twitter text-2xl" /></a>
                            <a href="https://linkedin.com/in/muhammad-hasan" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition"><i className="pi pi-linkedin text-2xl" /></a>
                        </div>
                    </div>
                </motion.section>
            </div>
        </>
    );
}
