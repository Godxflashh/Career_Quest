"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from 'next/dynamic';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Lazy load the PDF component since it's not needed immediately
const CareerRoadmapPDF = dynamic(() => import('./career-roadmap-pdf'), {
    loading: () => <div className="w-full p-4 text-center">Loading PDF generator...</div>,
    ssr: false
});

const UserRegistrationForm = () => {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Basic Info
        fullName: "",
        email: "",
        
        // Educational Qualifications
        tenthGrade: {
            passingYear: "",
            percentage: ""
        },
        twelfthGrade: {
            passingYear: "",
            percentage: "",
            stream: ""
        },
        higherEducation: {
            degree: "",
            specialization: "",
            collegeName: "",
            graduationYear: "",
            cgpa: ""
        },
        
        // Skills
        skills: [],
        tools: [],
        
        // Career Interests
        preferredField: "",
        dreamRole: "",
        
        // Other Info
        workExperience: "",
        learningPreferences: [],
        languages: []
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoize streams array to prevent unnecessary re-renders
    const streams = useMemo(() => ["Science", "Commerce", "Arts"], []);

    // Optimize input handlers using useCallback
    const handleInputChange = useCallback((e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }, []);

    const handleStreamSelect = useCallback((selectedStream) => {
        setFormData(prev => ({
            ...prev,
            twelfthGrade: {
                ...prev.twelfthGrade,
                stream: selectedStream
            }
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Simulate form processing
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Don't render until mounted
    if (!mounted) {
        return null;
    }

    // Memoize step content rendering
    const renderStepContent = useCallback(() => {
        switch (step) {
            case 1:
                return renderBasicInfo();
            case 2:
                return renderEducation();
            case 3:
                return renderSkills();
            case 4:
                return renderCareerInterests();
            case 5:
                return renderOtherInfo();
            default:
                return null;
        }
    }, [step]);

    const renderBasicInfo = () => (
        <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary/10 rounded-lg">👤</span>
                Basic Info
            </h3>
            <div className="space-y-6">
                <div className="transition-all duration-300 hover:shadow-md p-6 rounded-lg border">
                    <Label htmlFor="fullName" className="text-sm font-medium mb-2 block">
                        Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="transition-all duration-300 hover:shadow-md p-6 rounded-lg border">
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>
        </div>
    );

    const renderEducation = () => (
        <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary/10 rounded-lg">🎓</span>
                Educational Qualifications
            </h3>
            <div className="space-y-6">
                {/* 10th Grade */}
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <h4 className="font-medium mb-4 text-primary">10th Grade</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="tenthPassingYear">
                                Passing Year <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="tenthPassingYear"
                                name="passingYear"
                                type="number"
                                value={formData.tenthGrade.passingYear}
                                onChange={(e) => handleInputChange(e, 'tenthGrade')}
                                className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="tenthPercentage">
                                Percentage / CGPA <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="tenthPercentage"
                                name="percentage"
                                value={formData.tenthGrade.percentage}
                                onChange={(e) => handleInputChange(e, 'tenthGrade')}
                                className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* 12th Grade */}
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <h4 className="font-medium mb-4 text-primary">12th Grade</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="twelfthPassingYear">
                                Passing Year <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="twelfthPassingYear"
                                name="passingYear"
                                type="number"
                                value={formData.twelfthGrade.passingYear}
                                onChange={(e) => handleInputChange(e, 'twelfthGrade')}
                                className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="twelfthPercentage">
                                Percentage / CGPA <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="twelfthPercentage"
                                name="percentage"
                                value={formData.twelfthGrade.percentage}
                                onChange={(e) => handleInputChange(e, 'twelfthGrade')}
                                className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Label>Stream <span className="text-red-500">*</span></Label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {streams.map((stream) => (
                                <Button
                                    key={stream}
                                    type="button"
                                    variant={formData.twelfthGrade.stream === stream ? "default" : "outline"}
                                    onClick={() => handleStreamSelect(stream)}
                                    className="w-full cursor-pointer transition-all duration-300 hover:scale-105"
                                >
                                    {stream}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Higher Education */}
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <h4 className="font-medium mb-4 text-primary">Higher Education</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="degree">
                                Degree <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="degree"
                                name="degree"
                                placeholder="e.g., B.Tech, BBA, B.Sc."
                                value={formData.higherEducation.degree}
                                onChange={(e) => handleInputChange(e, 'higherEducation')}
                                className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="specialization">
                                Specialization <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="specialization"
                                name="specialization"
                                placeholder="e.g., Computer Science, Finance"
                                value={formData.higherEducation.specialization}
                                onChange={(e) => handleInputChange(e, 'higherEducation')}
                                className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSkills = () => (
        <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary/10 rounded-lg">💪</span>
                Skill Set
            </h3>
            <div className="space-y-6">
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <Label htmlFor="skills">
                        Current Skills <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="skills"
                        name="skills"
                        placeholder="Enter your skills (comma separated)"
                        value={formData.skills.join(", ")}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            skills: e.target.value.split(",").map(skill => skill.trim())
                        }))}
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <Label htmlFor="tools">
                        Tools/Technologies Known <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="tools"
                        name="tools"
                        placeholder="Enter tools/technologies (comma separated)"
                        value={formData.tools.join(", ")}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            tools: e.target.value.split(",").map(tool => tool.trim())
                        }))}
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
            </div>
        </div>
    );

    const renderCareerInterests = () => (
        <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary/10 rounded-lg">🎯</span>
                Career Interests
            </h3>
            <div className="space-y-6">
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <Label htmlFor="preferredField">
                        Preferred Field/Domain <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="preferredField"
                        name="preferredField"
                        value={formData.preferredField}
                        onChange={handleInputChange}
                        placeholder="e.g., Software Development, Marketing"
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <Label htmlFor="dreamRole">
                        Dream Role/Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="dreamRole"
                        name="dreamRole"
                        value={formData.dreamRole}
                        onChange={handleInputChange}
                        placeholder="e.g., Full Stack Developer, Marketing Manager"
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
            </div>
        </div>
    );

    const renderOtherInfo = () => (
        <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary/10 rounded-lg">📝</span>
                Other Info
            </h3>
            <div className="space-y-6">
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <Label htmlFor="workExperience">
                        Work Experience <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="workExperience"
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleInputChange}
                        placeholder="Describe your work experience"
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <Label className="mb-3 block">
                        Learning Preferences <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                        {['Free', 'Paid', 'Online', 'Offline'].map((pref) => (
                            <div key={pref} className="flex items-center space-x-2 hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                                <input
                                    type="checkbox"
                                    id={pref.toLowerCase()}
                                    name="learningPreferences"
                                    value={pref}
                                    checked={formData.learningPreferences.includes(pref)}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            learningPreferences: e.target.checked
                                                ? [...prev.learningPreferences, value]
                                                : prev.learningPreferences.filter(p => p !== value)
                                        }));
                                    }}
                                    className="cursor-pointer"
                                    required={formData.learningPreferences.length === 0}
                                />
                                <Label htmlFor={pref.toLowerCase()} className="cursor-pointer">{pref}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md">
                    <Label htmlFor="languages">
                        Languages Known <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="languages"
                        name="languages"
                        placeholder="Enter languages (comma separated)"
                        value={formData.languages.join(", ")}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            languages: e.target.value.split(",").map(lang => lang.trim())
                        }))}
                        className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="max-w-3xl mx-auto mt-16">
                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Profile Setup</h2>
                            <div className="text-sm text-muted-foreground">
                                Step {step} of 5
                            </div>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${(step / 5) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Step Content with Animation */}
                    <div className="transition-all duration-300 transform mt-8">
                        {renderStepContent()}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-12">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(prev => Math.max(1, prev - 1))}
                            disabled={step === 1 || isLoading}
                            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:hover:scale-100"
                            style={{ cursor: 'pointer' }}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        
                        {step < 5 ? (
                            <Button
                                type="button"
                                onClick={() => setStep(prev => Math.min(5, prev + 1))}
                                disabled={isLoading}
                                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md"
                                style={{ cursor: 'pointer' }}
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button 
                                type="submit"
                                disabled={isLoading}
                                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md bg-primary hover:cursor-pointer"
                                style={{ cursor: 'pointer' }}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Get Started'}
                            </Button>
                        )}
                    </div>

                    {/* PDF Generation Section */}
                    {isSubmitted && (
                        <div className="mt-12 pt-8 border-t animate-fadeIn">
                            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Generate Your Career Roadmap
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Download a personalized PDF containing your profile summary, recommended skills, 
                                career path suggestions, and a step-by-step roadmap based on your interests.
                            </p>
                            <CareerRoadmapPDF userData={formData} />
                        </div>
                    )}
                </form>
            </div>

            {/* Add global styles */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default UserRegistrationForm; 