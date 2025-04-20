"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "./ui/button";
import { Download } from "lucide-react";

// Dynamically import pdf-lib to reduce initial bundle size
const PDFLib = dynamic(() => import('pdf-lib').then(mod => ({
    PDFDocument: mod.PDFDocument,
    rgb: mod.rgb,
    StandardFonts: mod.StandardFonts
})), {
    ssr: false,
    loading: () => null
});

const CareerRoadmapPDF = ({ userData }) => {
    const [mounted, setMounted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoize helper functions
    const generateRecommendedSkills = useMemo(() => (field) => {
        const skillMap = {
            'Software Development': [
                'Cloud Computing (AWS/Azure)',
                'DevOps practices',
                'Microservices Architecture',
                'Container Technologies (Docker/Kubernetes)',
                'API Design and Development'
            ],
            'Marketing': [
                'Digital Marketing Analytics',
                'Content Marketing Strategy',
                'SEO/SEM',
                'Social Media Marketing',
                'Marketing Automation Tools'
            ],
            'Data Science': [
                'Machine Learning',
                'Statistical Analysis',
                'Python/R Programming',
                'Big Data Technologies',
                'Data Visualization'
            ]
        };

        return skillMap[field] || [
            'Project Management',
            'Communication Skills',
            'Problem Solving',
            'Team Collaboration',
            'Industry-specific Tools'
        ];
    }, []);

    const generateCareerPaths = useMemo(() => (field, dreamRole) => {
        const pathMap = {
            'Software Development': [
                'Junior Developer -> Mid-level Developer -> Senior Developer',
                'Full Stack Developer -> Technical Lead -> Solution Architect',
                'Backend Developer -> DevOps Engineer -> Cloud Architect'
            ],
            'Marketing': [
                'Marketing Associate -> Marketing Manager -> Marketing Director',
                'Content Marketer -> Content Strategy Manager -> Chief Content Officer',
                'Digital Marketing Specialist -> Digital Marketing Manager -> CMO'
            ],
            'Data Science': [
                'Data Analyst -> Data Scientist -> Lead Data Scientist',
                'Business Intelligence Analyst -> Data Engineer -> Data Architect',
                'Machine Learning Engineer -> AI Researcher -> AI/ML Director'
            ]
        };

        return pathMap[field] || [
            'Entry Level -> Mid Level -> Senior Level',
            'Specialist -> Team Lead -> Department Head',
            'Individual Contributor -> Manager -> Director'
        ];
    }, []);

    const generateRoadmap = useMemo(() => (field, dreamRole) => {
        const roadmapMap = {
            'Software Development': [
                'Master fundamental programming concepts and languages',
                'Build personal projects for portfolio',
                'Learn version control and collaboration tools',
                'Practice coding challenges and problem-solving',
                'Contribute to open source projects',
                'Apply for internships or entry-level positions'
            ],
            'Marketing': [
                'Learn digital marketing fundamentals',
                'Get certified in key marketing tools',
                'Create and manage social media campaigns',
                'Develop content marketing skills',
                'Build a portfolio of marketing campaigns',
                'Network with industry professionals'
            ],
            'Data Science': [
                'Master statistics and mathematics',
                'Learn programming languages (Python/R)',
                'Practice with real datasets',
                'Participate in data science competitions',
                'Build machine learning projects',
                'Get certified in data science tools'
            ]
        };

        return roadmapMap[field] || [
            'Build foundational knowledge in the field',
            'Obtain relevant certifications',
            'Gain practical experience through projects',
            'Network with industry professionals',
            'Apply for relevant positions',
            'Continue learning and staying updated'
        ];
    }, []);

    const generatePDF = useCallback(async () => {
        if (!PDFLib) return;
        
        setIsGenerating(true);
        try {
            const { PDFDocument, rgb, StandardFonts } = await PDFLib;
            const pdfDoc = await PDFDocument.create();
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            const fontSize = 12;
            let currentY = height - 50;
            const margin = 50;
            const lineHeight = 20;

            // Title
            page.drawText('Career Development Roadmap', {
                x: margin,
                y: currentY,
                size: 24,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            currentY -= 40;

            // Name & Qualification Summary
            page.drawText('Name & Qualification Summary', {
                x: margin,
                y: currentY,
                size: 16,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            currentY -= lineHeight;

            // Safely access userData properties with fallbacks
            const fullName = userData?.fullName || 'Not provided';
            page.drawText(`Name: ${fullName}`, {
                x: margin + 10,
                y: currentY,
                size: fontSize,
                font: helveticaFont,
            });
            currentY -= lineHeight;

            const education = [
                `10th Grade: ${userData?.tenthGrade?.percentage || 'Not provided'}%`,
                `12th Grade: ${userData?.twelfthGrade?.percentage || 'Not provided'}% (${userData?.twelfthGrade?.stream || 'Not provided'})`,
                `${userData?.higherEducation?.degree || 'Not provided'} in ${userData?.higherEducation?.specialization || 'Not provided'}`,
            ];

            education.forEach(edu => {
                page.drawText(edu, {
                    x: margin + 10,
                    y: currentY,
                    size: fontSize,
                    font: helveticaFont,
                });
                currentY -= lineHeight;
            });
            currentY -= lineHeight;

            // Skill Summary
            page.drawText('Current Skill Summary', {
                x: margin,
                y: currentY,
                size: 16,
                font: helveticaFont,
            });
            currentY -= lineHeight;

            const skills = userData?.skills?.join(', ') || 'No skills provided';
            page.drawText(`Skills: ${skills}`, {
                x: margin + 10,
                y: currentY,
                size: fontSize,
                font: helveticaFont,
            });
            currentY -= lineHeight;

            const tools = userData?.tools?.join(', ') || 'No tools provided';
            page.drawText(`Tools & Technologies: ${tools}`, {
                x: margin + 10,
                y: currentY,
                size: fontSize,
                font: helveticaFont,
            });
            currentY -= lineHeight * 2;

            // Recommended Skills
            page.drawText('Recommended Skills to Learn', {
                x: margin,
                y: currentY,
                size: 16,
                font: helveticaFont,
            });
            currentY -= lineHeight;

            // Generate recommendations based on career interests
            const recommendedSkills = generateRecommendedSkills(userData?.preferredField || 'General');
            recommendedSkills.forEach(skill => {
                page.drawText(`* ${skill}`, {
                    x: margin + 10,
                    y: currentY,
                    size: fontSize,
                    font: helveticaFont,
                });
                currentY -= lineHeight;
            });
            currentY -= lineHeight;

            // Career Path Suggestions
            page.drawText('Career Path Suggestions', {
                x: margin,
                y: currentY,
                size: 16,
                font: helveticaFont,
            });
            currentY -= lineHeight;

            const careerPaths = generateCareerPaths(
                userData?.preferredField || 'General',
                userData?.dreamRole || 'Not specified'
            );
            careerPaths.forEach(path => {
                page.drawText(`* ${path}`, {
                    x: margin + 10,
                    y: currentY,
                    size: fontSize,
                    font: helveticaFont,
                });
                currentY -= lineHeight;
            });
            currentY -= lineHeight;

            // Step-by-step Roadmap
            page.drawText('Step-by-step Roadmap', {
                x: margin,
                y: currentY,
                size: 16,
                font: helveticaFont,
            });
            currentY -= lineHeight;

            const roadmap = generateRoadmap(
                userData?.preferredField || 'General',
                userData?.dreamRole || 'Not specified'
            );
            roadmap.forEach((step, index) => {
                page.drawText(`${index + 1}. ${step}`, {
                    x: margin + 10,
                    y: currentY,
                    size: fontSize,
                    font: helveticaFont,
                });
                currentY -= lineHeight;
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fullName.replace(/\s+/g, '_')}_career_roadmap.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    }, [PDFLib, userData]);

    if (!mounted) {
        return null;
    }

    return (
        <Button 
            onClick={generatePDF} 
            disabled={isGenerating}
            className="w-full mt-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:hover:scale-100 bg-primary hover:cursor-pointer"
            style={{ cursor: 'pointer' }}
        >
            {isGenerating ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                </span>
            ) : (
                <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Career Roadmap
                </>
            )}
        </Button>
    );
};

export default CareerRoadmapPDF; 