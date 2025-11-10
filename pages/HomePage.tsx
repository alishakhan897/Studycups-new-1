import React, { useState, useMemo, useEffect } from 'react';
import type { View, College } from '../types';
import { PARTNER_LOGOS } from '../logos';
import CollegeCard from '../components/CollegeCard';
import { EXAMS_DATA, BLOG_POSTS_DATA, TESTIMONIALS_DATA, COURSE_STREAMS } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';
import ContactForm from '../components/ContactForm';

interface HomePageProps {
    setView: (view: View) => void;
    colleges: College[];
    onOpenApplyNow: () => void;
}

const AnimatedContainer: React.FC<{children: React.ReactNode, delay?: number, className?: string}> = ({ children, delay = 0, className = '' }) => {
    // Fix: Removed 'triggerOnce' as it's not a valid property for IntersectionObserverInit. The hook's implementation already ensures it triggers once.
    const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`opacity-0 ${isVisible ? 'animate-fadeInUp' : ''} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const StreamTag: React.FC<{ stream: string }> = ({ stream }) => {
    const colors: { [key: string]: string } = {
        'Engineering': 'bg-blue-100 text-blue-800',
        'Medical': 'bg-green-100 text-green-800',
        'Management': 'bg-indigo-100 text-indigo-800',
        'Law': 'bg-yellow-100 text-yellow-800',
        'Civil Services': 'bg-red-100 text-red-800',
    };
    const colorClass = colors[stream] || 'bg-slate-100 text-slate-800';
    return (
        <div className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}>
            {stream}
        </div>
    );
};


const HomePage: React.FC<HomePageProps> = ({ setView, colleges, onOpenApplyNow }) => {
    const [selectedStream, setSelectedStream] = useState('All Streams');
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [heroFilters, setHeroFilters] = useState({ college: '', city: '', course: '' });
    
    const animatedCollegeWords = useMemo(() => ['Colleges', 'Universities'], []);
    const [animatedCollegeWordIndex, setAnimatedCollegeWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedCollegeWordIndex(prevIndex => (prevIndex + 1) % animatedCollegeWords.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [animatedCollegeWords]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setHeroFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setView({ page: 'listing', filters: heroFilters });
    };

    const streams = useMemo(() => ['All Streams', ...Object.keys(COURSE_STREAMS)], []);

    const courseToStreamMap = useMemo(() => {
        const map = new Map<string, string>();
        for (const stream in COURSE_STREAMS) {
            for (const courseName of COURSE_STREAMS[stream as keyof typeof COURSE_STREAMS]) {
                map.set(courseName, stream);
            }
        }
        return map;
    }, []);

    const filteredColleges = useMemo(() => {
        if (selectedStream === 'All Streams') {
            return colleges.slice(0, 8); // Default view
        }

        return colleges.filter(college =>
            college.courses.some(course => courseToStreamMap.get(course.name) === selectedStream)
        );
    }, [colleges, selectedStream, courseToStreamMap]);

    const whyChooseUsFeatures = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[--primary-medium]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
            title: "Comprehensive Data",
            description: "Access detailed information on thousands of colleges, courses, fees, and placement statistics all in one place."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[--primary-medium]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
            title: "AI-Powered Guidance",
            description: "Our smart AI assistant helps you find the perfect college based on your preferences, grades, and career goals."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[--accent-green]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "Simplified Applications",
            description: "Apply to multiple colleges with a single form, track your application status, and get timely reminders."
        }
    ];

    const courseCategories = [
        {
            name: 'Engineering',
            description: 'Innovate the future with cutting-edge technology and design.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
            color: 'bg-[--primary-medium]',
            courseCount: COURSE_STREAMS['Engineering'].length,
        },
        {
            name: 'Management',
            description: 'Lead organizations and shape the future of business.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            color: 'bg-blue-800',
            courseCount: COURSE_STREAMS['Management'].length,
        },
        {
            name: 'Medical',
            description: 'Embark on a noble journey to heal and care for others.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>,
            color: 'bg-green-600',
            courseCount: COURSE_STREAMS['Medical'].length,
        },
        {
            name: 'Arts & Science',
            description: 'Explore the depths of human knowledge and creativity.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
            color: 'bg-orange-500',
            courseCount: COURSE_STREAMS['Arts & Science'].length,
        },
        {
            name: 'Law',
            description: 'Uphold justice and navigate the complexities of the legal world.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l4.243 4.243-4.243 4.243M16.293 4.293l-4.243 4.243 4.243 4.243" /></svg>,
            color: 'bg-yellow-600',
            courseCount: COURSE_STREAMS['Law'].length,
        },
        {
            name: 'Design',
            description: 'Create visually stunning and functional products.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
            color: 'bg-pink-600',
            courseCount: COURSE_STREAMS['Design'].length,
        },
    ];

    const faqs = [
        {
            question: "How does the AI recommendation work?",
            answer: "Our AI College Counselor uses a powerful language model to understand your query. It analyzes your preferences for location, courses, budget, and other details, then matches them against our extensive database of colleges to provide you with personalized recommendations."
        },
        {
            question: "Is there a cost to apply through StudyCups?",
            answer: "Using the StudyCups portal to find and compare colleges is completely free. The 'Apply Now' feature connects you with college admission counselors. Standard application fees required by the colleges themselves may still apply."
        },
        {
            question: "How accurate is the college data?",
            answer: "We strive for the highest accuracy. Our team regularly updates information from official college websites, government data, and other reliable sources to ensure you have the most current details on fees, placements, and courses."
        },
        {
            question: "Can I compare more than two colleges?",
            answer: "Yes! On our 'Colleges' listing page, you can select the 'Compare' checkbox on any number of college cards. Once you have at least two selected, you can navigate to the 'Compare' page to see a detailed side-by-side comparison."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const blogCategoryColors: { [key: string]: string } = {
        'Rankings': 'bg-blue-100 text-blue-800',
        'Exam Prep': 'bg-orange-100 text-orange-800',
        'Career Advice': 'bg-green-100 text-green-800',
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-[--primary-dark] text-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <AnimatedContainer>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight h-16 md:h-20 flex items-center justify-center">
                            Find Your Dream&nbsp;
                            <span className="text-[--accent-orange] inline-block w-[190px] md:w-[280px] text-left">
                                <span key={animatedCollegeWordIndex} className="animate-slideInUp inline-block">
                                    {animatedCollegeWords[animatedCollegeWordIndex]}
                                </span>
                            </span>
                        </h1>
                    </AnimatedContainer>
                    <AnimatedContainer delay={150}>
                        <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
                            Explore thousands of colleges and courses. Get started by searching below.
                        </p>
                    </AnimatedContainer>
                    <AnimatedContainer delay={300}>
                        <form
                            onSubmit={handleSearch}
                            className="mt-8 max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div className="md:col-span-2 relative">
                                    <input
                                        type="text"
                                        name="college"
                                        value={heroFilters.college}
                                        onChange={handleFilterChange}
                                        placeholder="College name..."
                                        className="w-full pl-4 pr-4 py-3 bg-white/90 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary-medium]"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="city"
                                        value={heroFilters.city}
                                        onChange={handleFilterChange}
                                        placeholder="City..."
                                        className="w-full pl-4 pr-4 py-3 bg-white/90 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary-medium]"
                                    />
                                </div>
                                <button type="submit" className="w-full px-6 py-3 font-semibold text-white bg-[--accent-green] rounded-lg shadow-md hover:bg-green-700 transition-all duration-300">
                                    Search
                                </button>
                            </div>
                        </form>
                    </AnimatedContainer>
                </div>
            </section>

            {/* Scrolling Logos Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold text-slate-500 mb-8">
                        Trusted by Students from Top Institutions
                    </h2>
                    <div 
                        className="scrolling-logos-container w-full overflow-hidden relative"
                        style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
                    >
                        <div className="flex animate-scroll">
                            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
                                <div key={`${logo.src}-${index}`} className="flex-shrink-0 mx-10" style={{ width: '160px'}}>
                                    <img 
                                        src={logo.src} 
                                        alt={logo.alt} 
                                        className="h-16 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-800">Why Choose StudyCups?</h2>
                        <p className="mt-2 text-slate-500 max-w-2xl mx-auto">Your trusted partner in navigating the path to higher education.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {whyChooseUsFeatures.map((feature, index) => (
                            <AnimatedContainer key={index} delay={index * 150}>
                                <div className="text-center p-8 bg-white rounded-2xl shadow-lg h-full transform transition-transform hover:-translate-y-2 border">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mx-auto">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mt-6">{feature.title}</h3>
                                    <p className="text-slate-600 mt-2">{feature.description}</p>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore Courses Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-800">Explore Top Courses</h2>
                        <p className="mt-2 text-slate-500 max-w-2xl mx-auto">Discover programs that align with your passion and career goals.</p>
                    </div>
                    <div className="relative -mx-4">
                        <div className="flex overflow-x-auto space-x-8 pb-6 px-4 no-scrollbar">
                            {courseCategories.map((category, index) => (
                                <div key={category.name} className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[24vw]">
                                    <AnimatedContainer delay={index * 100}>
                                        <div
                                            onClick={() => setView({ page: 'courses' })}
                                            className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full cursor-pointer text-white ${category.color}`}
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="bg-white/20 p-3 rounded-full">
                                                    {category.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{category.name}</h3>
                                                    <span className="text-sm font-semibold bg-white/20 px-2 py-0.5 rounded-md">{category.courseCount}+ Courses</span>
                                                </div>
                                            </div>
                                            <p className="text-white/80 text-base mb-6 flex-grow">{category.description}</p>
                                            <span className="font-semibold text-white group-hover:underline">
                                                Explore Now &rarr;
                                            </span>
                                        </div>
                                    </AnimatedContainer>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters & Featured Colleges Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-extrabold">Find Your Ideal College</h2>
                         <p className="mt-2 text-slate-500">Select a stream to discover top-rated colleges.</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
                        {streams.map(stream => (
                             <button
                                key={stream}
                                onClick={() => setSelectedStream(stream)}
                                className={`px-5 py-2.5 md:px-6 md:py-3 font-semibold rounded-full text-sm md:text-base transition-all duration-300 shadow-sm transform hover:scale-105 ${
                                    selectedStream === stream
                                        ? 'bg-[--primary-medium] text-white shadow-lg'
                                        : 'bg-white text-slate-700 hover:bg-blue-100'
                                }`}
                            >
                                {stream}
                            </button>
                        ))}
                    </div>

                    {filteredColleges.length > 0 ? (
                        <div className="relative -mx-4">
                            <div className="flex overflow-x-auto space-x-8 pb-6 px-4 no-scrollbar">
                                {filteredColleges.map((college, index) => (
                                    <div key={college.id} className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[24vw]">
                                        <AnimatedContainer delay={index * 100}>
                                            <CollegeCard college={college} setView={setView} />
                                        </AnimatedContainer>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-700">No Colleges Match Your Criteria</h3>
                            <p className="text-slate-500 mt-2">Try adjusting your filters or view all colleges.</p>
                        </div>
                    )}
                    
                    <div className="text-center mt-12">
                        <button 
                            onClick={() => setView({ page: 'listing' })}
                            className="px-6 py-3 font-semibold text-white bg-[--primary-medium] rounded-lg shadow-md hover:bg-[--primary-dark] transition-all"
                        >
                            View All Colleges
                        </button>
                    </div>
                </div>
            </section>

             {/* Exams Section */}
             <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center mb-10">Popular Exams</h2>
                    <div className="relative -mx-4">
                        <div className="flex overflow-x-auto space-x-8 pb-6 px-4 no-scrollbar">
                            {EXAMS_DATA.slice(0, 6).map((exam, index) => (
                                <div key={exam.id} className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[24vw]">
                                    <AnimatedContainer delay={index * 100}>
                                        <div 
                                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer h-full flex flex-col border"
                                            onClick={() => setView({ page: 'exam-detail', examId: exam.id })}
                                        >
                                            <div className="p-6 relative">
                                                <StreamTag stream={exam.stream} />
                                                <img src={exam.logoUrl} alt={`${exam.name} logo`} className="h-20 w-20 rounded-full flex-shrink-0 bg-slate-100 p-2" />
                                            </div>
                                            <div className="p-6 pt-0 flex flex-col flex-grow">
                                                <h2 className="text-2xl font-bold text-slate-800">{exam.name}</h2>
                                                <p className="text-sm text-slate-500 mt-1 flex-grow">{exam.conductingBody}</p>
                                                <div className="mt-6 border-t pt-4">
                                                    <p className="text-xs font-semibold text-slate-400">EXAM DATE</p>
                                                    <p className="font-bold text-[--primary-medium] text-lg">{exam.date}</p>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 group-hover:bg-[--primary-medium] p-4 text-center font-semibold text-[--primary-medium] group-hover:text-white transition-all duration-300">
                                                View Details &rarr;
                                            </div>
                                        </div>
                                    </AnimatedContainer>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="text-center mt-12">
                        <button 
                            onClick={() => setView({ page: 'exams' })}
                            className="px-6 py-3 font-semibold text-[--primary-medium] border-2 border-[--primary-medium] rounded-lg hover:bg-blue-50 transition-all"
                        >
                            Explore All Exams
                        </button>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-800">Frequently Asked Questions</h2>
                        <p className="mt-2 text-slate-500 max-w-2xl mx-auto">
                            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden transition-all duration-300">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex justify-between items-center text-left p-6"
                                    >
                                        <span className="font-semibold text-lg text-slate-800">{faq.question}</span>
                                        <span className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-45' : 'rotate-0'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[--primary-medium]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                        </span>
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out grid ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 pt-0">
                                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center mb-12">What Our Students Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS_DATA.map((testimonial, index) => (
                             <AnimatedContainer key={testimonial.id} delay={index * 100}>
                                <div className="bg-slate-50 p-8 rounded-2xl border h-full flex flex-col text-center transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                                    <svg className="absolute -top-8 -left-8 w-32 h-32 text-slate-200/50 transform rotate-12" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                                    </svg>
                                    <div className="relative z-10 flex-grow flex flex-col">
                                        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-20 h-20 rounded-full mb-5 mx-auto ring-4 ring-white object-cover shadow-md" />
                                        <p className="font-medium text-lg text-slate-700 leading-relaxed flex-grow">"{testimonial.quote}"</p>
                                        <div className="w-16 h-0.5 bg-blue-200 mx-auto my-6"></div>
                                        <div className="mt-auto">
                                            <p className="font-bold text-slate-800 text-lg">{testimonial.name}</p>
                                            <p className="text-sm text-[--primary-medium] font-semibold">{testimonial.college}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center mb-10">Latest from our Blog</h2>
                    <div className="relative -mx-4">
                        <div className="flex overflow-x-auto space-x-8 pb-6 px-4 no-scrollbar">
                            {BLOG_POSTS_DATA.map((post, index) => (
                                <div key={post.id} className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[24vw]">
                                    <AnimatedContainer delay={index * 100}>
                                        <div 
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 border" 
                                            onClick={() => setView({ page: 'blog-detail', postId: post.id })}
                                        >
                                            <div className="relative overflow-hidden">
                                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="mb-3">
                                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${blogCategoryColors[post.category] || 'bg-slate-100 text-slate-800'}`}>{post.category}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-800 leading-tight flex-grow group-hover:text-[--primary-medium] transition-colors duration-300">{post.title}</h3>
                                                <p className="text-slate-600 text-sm mt-2" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {post.excerpt}
                                                </p>
                                                <div className="mt-auto pt-4">
                                                    <span className="font-semibold text-[--primary-medium] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                                        Read More 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedContainer>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="text-center mt-12">
                        <button 
                            onClick={() => setView({ page: 'blog' })}
                            className="px-6 py-3 font-semibold text-[--primary-medium] border-2 border-[--primary-medium] rounded-lg hover:bg-blue-50 transition-all"
                        >
                            Read More Articles
                        </button>
                    </div>
                </div>
            </section>
            
            {/* Contact Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-800">Get In Touch</h2>
                        <p className="mt-2 text-slate-500 max-w-2xl mx-auto">
                            Have questions about admissions, courses, or anything else? We're here to help.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        <AnimatedContainer>
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-[--text-primary]">Contact Information</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Fill out the form and our team will get back to you within 24 hours. You can also reach us through the contact details below.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[--primary-medium]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">Phone</p>
                                            <a href="tel:+918081269969" className="text-slate-600 hover:text-[--primary-medium]">+91 8081269969</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                         <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[--primary-medium]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">Email</p>
                                            <a href="mailto:Support@studycups.in" className="text-slate-600 hover:text-[--primary-medium]">Support@studycups.in</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedContainer>
                        <AnimatedContainer delay={150}>
                            <ContactForm />
                        </AnimatedContainer>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
