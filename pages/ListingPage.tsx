
import React, { useState, useMemo } from 'react';
import type { View, College } from '../types';
import CollegeCard from '../components/CollegeCard';
import { COURSE_STREAMS } from '../constants';

type Filters = {
    college: string;
    city: string;
    course: string;
    stream: string;
    collegeType: 'All' | 'Private' | 'Government';
    minRating: number;
};

interface ListingPageProps {
    setView: (view: View) => void;
    colleges: College[];
    compareList: number[];
    onCompareToggle: (id: number) => void;
    onOpenApplyNow: () => void;
    onOpenAIAssistant: () => void;
    initialFilters?: { college?: string; city?: string; course?: string };
}

interface FilterSidebarProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, onClearFilters }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const setFilterValue = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }

    const streams = Object.keys(COURSE_STREAMS);
    const collegeTypes: Filters['collegeType'][] = ['All', 'Private', 'Government'];
    const ratings = [
        { label: 'Any', value: 0 },
        { label: '4.5+', value: 4.5 },
        { label: '4.0+', value: 4.0 },
        { label: '3.5+', value: 3.5 },
    ];

    return (
        <aside className="w-full lg:w-1/4 xl:w-1/5 p-6 bg-white rounded-2xl shadow-lg h-fit sticky top-24 border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={onClearFilters} className="text-sm font-semibold text-[--primary-medium] hover:underline">Clear All</button>
            </div>
            <div className="space-y-6">
                {/* Search Inputs */}
                <div>
                    <label htmlFor="college" className="font-semibold text-slate-800">College Name</label>
                    <input type="text" id="college" name="college" value={filters.college} onChange={handleInputChange} placeholder="Search by name" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[--primary-medium] transition"/>
                </div>
                <div>
                    <label htmlFor="city" className="font-semibold text-slate-800">Location</label>
                    <input type="text" id="city" name="city" value={filters.city} onChange={handleInputChange} placeholder="Search by city" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[--primary-medium] transition"/>
                </div>
                <div>
                    <label htmlFor="course" className="font-semibold text-slate-800">Course</label>
                    <input type="text" id="course" name="course" value={filters.course} onChange={handleInputChange} placeholder="Search by course" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[--primary-medium] transition"/>
                </div>
                
                {/* Stream Filters */}
                <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Stream</h4>
                    <div className="flex flex-wrap gap-2">
                         <button
                            onClick={() => setFilterValue('stream', 'All')}
                            className={`px-3 py-1.5 text-sm rounded-full border ${filters.stream === 'All' ? 'bg-[--primary-medium] text-white border-[--primary-medium]' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-100'}`}
                        >
                            All
                        </button>
                        {streams.map(stream => (
                             <button
                                key={stream}
                                onClick={() => setFilterValue('stream', stream)}
                                className={`px-3 py-1.5 text-sm rounded-full border ${filters.stream === stream ? 'bg-[--primary-medium] text-white border-[--primary-medium]' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-100'}`}
                            >
                                {stream}
                            </button>
                        ))}
                    </div>
                </div>

                {/* College Type Filters */}
                <div>
                    <h4 className="font-semibold text-slate-800 mb-2">College Type</h4>
                    <div className="flex flex-wrap gap-2">
                        {collegeTypes.map(type => (
                             <button
                                key={type}
                                onClick={() => setFilterValue('collegeType', type)}
                                className={`px-3 py-1.5 text-sm rounded-full border ${filters.collegeType === type ? 'bg-[--primary-medium] text-white border-[--primary-medium]' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-100'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rating Filters */}
                <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Min. Rating</h4>
                    <div className="flex flex-wrap gap-2">
                        {ratings.map(rating => (
                             <button
                                key={rating.value}
                                onClick={() => setFilterValue('minRating', rating.value)}
                                className={`px-3 py-1.5 text-sm rounded-full border ${filters.minRating === rating.value ? 'bg-[--primary-medium] text-white border-[--primary-medium]' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-100'}`}
                            >
                                {rating.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

const ListingPage: React.FC<ListingPageProps> = ({ setView, colleges, compareList, onCompareToggle, onOpenApplyNow, onOpenAIAssistant, initialFilters }) => {
    const [filters, setFilters] = useState<Filters>({
        college: initialFilters?.college || '',
        city: initialFilters?.city || '',
        course: initialFilters?.course || '',
        stream: 'All',
        collegeType: 'All',
        minRating: 0,
    });
    
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
        return colleges.filter(college => {
            const collegeMatch = filters.college ? college.name.toLowerCase().includes(filters.college.toLowerCase()) : true;
            const cityMatch = filters.city ? college.location.toLowerCase().includes(filters.city.toLowerCase()) : true;
            const courseMatch = filters.course ? college.courses.some(c => c.name.toLowerCase().includes(filters.course.toLowerCase())) : true;
            const streamMatch = filters.stream === 'All' || college.courses.some(c => courseToStreamMap.get(c.name) === filters.stream);
            const typeMatch = filters.collegeType === 'All' || college.type === filters.collegeType;
            const ratingMatch = college.rating >= filters.minRating;
            
            return collegeMatch && cityMatch && courseMatch && streamMatch && typeMatch && ratingMatch;
        });
    }, [colleges, filters, courseToStreamMap]);

    const handleClearFilters = () => {
        setFilters({
            college: '',
            city: '',
            course: '',
            stream: 'All',
            collegeType: 'All',
            minRating: 0
        });
    };

    return (
        <div>
            {/* Hero Section */}
            <section 
                className="bg-[--primary-dark] py-20 mb-12 rounded-b-3xl"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Find Your Perfect College</h1>
                    <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                        Use our advanced filters or ask our AI counselor to discover the best institution for you.
                    </p>
                    <button 
                        onClick={onOpenAIAssistant}
                        className="mt-8 flex items-center justify-center gap-2 mx-auto px-6 py-3 font-semibold text-white bg-[--primary-medium] rounded-lg shadow-lg border-2 border-transparent hover:bg-white hover:text-[--primary-medium] hover:border-[--primary-medium] transition-all duration-300 transform hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        Ask AI Counselor
                    </button>
                </div>
            </section>
        
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <FilterSidebar
                        filters={filters}
                        setFilters={setFilters}
                        onClearFilters={handleClearFilters}
                    />
                    <main className="w-full lg:w-3/4 xl:w-4/5">
                        <div className="mb-4 flex justify-between items-center">
                            <p className="font-semibold text-slate-700">Showing {filteredColleges.length} of {colleges.length} colleges</p>
                            {/* Sorting Dropdown can be added here */}
                        </div>
                        {filteredColleges.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredColleges.map(college => (
                                    <CollegeCard 
                                        key={college.id} 
                                        college={college} 
                                        setView={setView}
                                        onCompareToggle={onCompareToggle}
                                        isCompared={compareList.includes(college.id)}
                                        isListingCard={true}
                                        onOpenApplyNow={onOpenApplyNow}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg shadow-sm mt-8 lg:mt-0 border">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
                                </svg>
                                <h3 className="text-2xl font-semibold text-slate-700 mt-4">No Colleges Found</h3>
                                <p className="text-slate-500 mt-2">Try adjusting your search criteria or clearing the filters.</p>
                                <button onClick={handleClearFilters} className="mt-6 px-5 py-2.5 bg-[--primary-medium] text-white font-semibold rounded-lg shadow-md hover:bg-[--primary-dark] transition-colors">Clear Filters</button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ListingPage;
