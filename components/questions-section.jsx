"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const QuestionsSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const questions = [
        {
            question: "What career options match my current education and skills?",
            answer: [
                "We analyze the education level and skills you provide to suggest careers that are a good fit.",
                "Whether you're a student, graduate, or professional, we tailor suggestions accordingly.",
                "You'll discover options you might not have considered before.",
                "Our goal is to help you make informed career decisions."
            ]
        },
        {
            question: "What courses or certifications should I take to reach my dream job?",
            answer: [
                "Based on your goal, we suggest relevant courses, certifications, or specializations.",
                "These recommendations help bridge the gap between your current skills and what's needed.",
                "We also highlight platforms where you can take these courses.",
                "You get a clear roadmap to grow in your desired direction."
            ]
        },
        {
            question: "How can I switch careers with my existing background?",
            answer: [
                "If you're looking to change your field, we show you realistic transition paths.",
                "We consider your education, skills, and experience to recommend next steps.",
                "Our suggestions include careers that are easier to switch into.",
                "We also suggest upskilling options to make the switch smoother."
            ]
        },
        {
            question: "Which skills are in demand for the career I'm interested in?",
            answer: [
                "We track industry trends to show you the most in-demand skills for your chosen field.",
                "This helps you stay updated and competitive in the job market.",
                "Whether it's tech tools, soft skills, or certifications—we've got it covered.",
                "You'll know exactly what to focus on for better job opportunities."
            ]
        }
    ];

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-4xl font-bold text-white text-center mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-400 text-center mb-12">
                    Find answers to common questions about our platform
                </p>
                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div 
                            key={index}
                            className="border-b border-gray-800"
                        >
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full py-6 flex items-center justify-between text-left text-gray-100 hover:text-white transition-colors duration-300"
                            >
                                <span className="text-lg font-medium pr-8">{item.question}</span>
                                <ChevronDown 
                                    className={`w-5 h-5 transform transition-transform duration-300 flex-shrink-0 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-[400px]' : 'max-h-0'
                                }`}
                            >
                                <div className="space-y-3 pb-6">
                                    {item.answer.map((line, i) => (
                                        <p key={i} className="text-gray-400">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuestionsSection; 