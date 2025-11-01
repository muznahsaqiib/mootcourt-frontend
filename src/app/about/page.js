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
                    content="Discover AI Legal Evaluator — an innovation by Muhammad Hasan combining artificial intelligence and legal expertise to revolutionize case analysis and courtroom training."
                />
                <meta
                    name="keywords"
                    content="AI Legal Evaluator, legal AI, lawtech, mootcourt, case evaluation, AI in law, Muhammad Hasan"
                />
            </Head>

            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                {/* ===== Our Vision ===== */}
                <motion.section
                    ref={visionRef}
                    className="h-screen flex flex-col justify-center items-center p-10 bg-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600">Our Vision</h2>
                    <p className="max-w-3xl text-center text-lg text-gray-700 leading-relaxed">
                        "Transforming Legal Intelligence Through AI-Powered Evaluation"
                    </p>
                    <p className="max-w-3xl mt-4 text-center text-gray-600">
                        At <strong>AI Legal Evaluator</strong>, we envision a world where artificial intelligence simplifies and enhances
                        the process of legal research, argument evaluation, and advocacy training.
                        Our mission is to bridge the gap between technology and the legal field — enabling lawyers, students,
                        and institutions to make faster, data-driven, and fairer legal decisions.
                    </p>
                </motion.section>

                {/* ===== About Us ===== */}
                <motion.section
                    ref={aboutRef}
                    className="h-screen flex flex-col justify-center items-center p-10 bg-gray-100"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600">About Us</h2>
                    <p className="max-w-4xl text-center text-lg text-gray-700 leading-relaxed">
                        "Where Legal Precision Meets Artificial Intelligence"
                    </p>

                    <div className="mt-6 max-w-4xl text-gray-700 text-lg space-y-4">
                        <p><strong className="text-indigo-500">Founder:</strong></p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong>Muhammad Hasan</strong> — Computer Engineer &amp; LegalTech Innovator</li>
                        </ul>

                        <p><strong className="text-indigo-500">What We Do:</strong></p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Develop AI tools to <strong>analyze, score, and evaluate</strong> legal arguments.</li>
                            <li>Enable <strong>AI-assisted moot court simulations</strong> for students and professionals.</li>
                            <li>Integrate <strong>machine learning and NLP</strong> to assess reasoning, evidence, and tone.</li>
                            <li>Offer smart dashboards for <strong>law firms and institutions</strong> to evaluate case performance.</li>
                        </ul>

                        <p className="mt-4 text-gray-600">
                            The platform merges data science with legal reasoning to make justice education and litigation preparation more efficient and accessible worldwide.
                        </p>
                    </div>
                </motion.section>

                {/* ===== Contact Us ===== */}
                <motion.section
                    ref={contactRef}
                    className="h-screen flex flex-col justify-center items-center p-10 bg-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600">Contact Us</h2>
                    <p className="max-w-3xl text-center text-lg text-gray-700 leading-relaxed">
                        We'd love to connect with innovators, law schools, and AI enthusiasts.
                    </p>

                    <div className="mt-6 text-center text-gray-700 space-y-3">
                        <p><strong>Email:</strong> <a href="mailto:ailegalevaluator@gmail.com" className="text-indigo-500 hover:underline transition">ailegalevaluator@gmail.com</a></p>
                        <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/muhammad-hasan" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline transition">linkedin.com/in/muhammad-hasan</a></p>

                        <div className="flex justify-center gap-6 mt-4 text-indigo-500">
                            <a href="https://github.com/Hasan105" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition"><i className="pi pi-github text-2xl" /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition"><i className="pi pi-twitter text-2xl" /></a>
                            <a href="https://linkedin.com/in/muhammad-hasan" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition"><i className="pi pi-linkedin text-2xl" /></a>
                        </div>
                    </div>
                </motion.section>
            </div>
        </>
    );
}
