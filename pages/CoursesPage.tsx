
import React, { useState, useMemo } from 'react';
import type { View } from '../types';
import { POPULAR_COURSES_DATA } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

const AnimatedContainer: React.FC<{children: React.ReactNode, delay?: number, className?: string}> = ({ children, delay = 0, className = '' }) => {
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

const icons: { [key: string]: React.ReactNode } = {
    btech: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    mba: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    bba: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    mca: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    mbbs: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3M15 21a2 2 0 002-2v-1a2 2 0 00-2-2h-3a2 2 0 00-2 2v1a2 2 0 002 2z" /></svg>,
    llb: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l4.243 4.243-4.243 4.243M16.293 4.293l-4.243 4.243 4.243 4.243" /></svg>,
    bcom: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m5 6H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z" /></svg>,
    bdes: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
};

const courseColors: { [key: string]: string } = {
    btech: 'bg-[--primary-medium]',
    mba: 'bg-[--primary-dark]',
    bba: 'bg-orange-500',
    mca: 'bg-blue-700',
    mbbs: 'bg-green-600',
    llb: 'bg-yellow-600',
    bcom: 'bg-red-600',
    bdes: 'bg-pink-600',
};

interface CoursesPageProps {
    setView: (view: View) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ setView }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStream, setSelectedStream] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');

    const streams = useMemo(() => ['All', ...Array.from(new Set(POPULAR_COURSES_DATA.map(c => c.stream)))], []);
    const levels = useMemo(() => ['All', ...Array.from(new Set(POPULAR_COURSES_DATA.map(c => c.level)))], []);

    const filteredCourses = useMemo(() => {
        const lowercasedFilter = searchTerm.toLowerCase();

        return POPULAR_COURSES_DATA.filter(course => {
            const searchMatch = !searchTerm.trim() ||
                course.name.toLowerCase().includes(lowercasedFilter) ||
                course.fullName.toLowerCase().includes(lowercasedFilter) ||
                course.description.toLowerCase().includes(lowercasedFilter);

            const streamMatch = selectedStream === 'All' || course.stream === selectedStream;
            const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;

            return searchMatch && streamMatch && levelMatch;
        });
    }, [searchTerm, selectedStream, selectedLevel]);
    
    const handleClearFilters = () => {
        setSelectedStream('All');
        setSelectedLevel('All');
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Explore Top Courses</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Find the perfect program to kickstart your career. Search for a course below.
                </p>
                <div className="mt-8 max-w-2xl mx-auto relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for B.Tech, MBA, Design..."
                        className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-full text-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[--primary-medium] transition-all"
                    />
                </div>
            </div>

            {/* Filters Section */}
            <div className="mb-12 space-y-6 bg-slate-50 p-6 rounded-2xl border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h3 className="font-bold text-lg text-slate-700 mb-3 text-center md:text-left">Filter by Stream</h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            {streams.map(stream => (
                                <button
                                    key={stream}
                                    onClick={() => setSelectedStream(stream)}
                                    className={`px-4 py-2 font-semibold rounded-full text-sm transition-all duration-300 shadow-sm transform hover:scale-105 ${
                                        selectedStream === stream
                                            ? 'bg-[--primary-medium] text-white shadow-lg'
                                            : 'bg-white text-slate-700 hover:bg-blue-100'
                                    }`}
                                >
                                    {stream}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg text-slate-700 mb-3 text-center md:text-left">Filter by Level</h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            {levels.map(level => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`px-4 py-2 font-semibold rounded-full text-sm transition-all duration-300 shadow-sm transform hover:scale-105 ${
                                        selectedLevel === level
                                            ? 'bg-[--primary-medium] text-white shadow-lg'
                                            : 'bg-white text-slate-700 hover:bg-blue-100'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {(selectedStream !== 'All' || selectedLevel !== 'All') && (
                    <div className="text-center border-t pt-4">
                        <button 
                            onClick={handleClearFilters}
                            className="text-slate-500 font-semibold hover:text-red-500 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
            
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCourses.map((course, index) => (
                        <AnimatedContainer key={course.name} delay={index * 80}>
                            <div
                                onClick={() => setView({ page: 'course-detail', courseName: course.courseLinkName })}
                                className={`p-6 rounded-2xl shadow-lg hover:shadow-xl text-white flex flex-col h-full cursor-pointer group transform hover:-translate-y-2 transition-all duration-300 ${courseColors[course.icon]}`}
                            >
                                <div className="flex justify-between items-start">
                                    <h2 className="text-4xl font-extrabold">{course.name}</h2>
                                    <div className="p-3 bg-white/20 rounded-full">
                                        {icons[course.icon]}
                                    </div>
                                </div>
                                <p className="text-lg font-semibold mt-1 opacity-90">{course.fullName}</p>
                                <div className="border-t border-white/30 my-4"></div>
                                <p className="text-white/80 text-base flex-grow">{course.description}</p>
                                <div className="mt-6 text-center">
                                    <span className="font-semibold text-white group-hover:underline text-lg">
                                        View Details &rarr;
                                    </span>
                                </div>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-20 bg-white rounded-lg shadow-sm border">
                    <h3 className="text-2xl font-semibold text-slate-700">No Courses Found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your filters or search term.</p>
                </div>
            )}
        </div>
    );
};

export default CoursesPage;