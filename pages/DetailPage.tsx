
import React, { useState } from 'react';
import type { View, College, Course } from '../types';

interface DetailPageProps {
    college: College;
    setView: (view: View) => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ college, setView }) => {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = ['Overview', 'Courses & Fees', 'Placements', 'Reviews', 'Gallery'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Courses & Fees':
                return (
                    <div className="space-y-4">
                        {college.courses.map((course: Course) => (
                            <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div>
                                        <h4 className="text-xl font-bold text-[--primary-medium]">{course.name}</h4>
                                        <div className="flex gap-x-4 text-sm text-slate-500 mt-2">
                                            <span>Duration: {course.duration}</span>
                                            <span>Level: {course.level}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-left md:text-right">
                                        <p className="text-lg font-bold">₹{course.fees.toLocaleString('en-IN')} / year</p>
                                        <p className="text-sm text-slate-500">Eligibility: {course.eligibility}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Placements':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold mb-4">Placement Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-3xl font-bold text-[--primary-medium]">{college.placements.highestPackage}</p>
                                <p className="text-slate-500">Highest Package</p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg">
                                <p className="text-3xl font-bold text-orange-600">{college.placements.averagePackage}</p>
                                <p className="text-slate-500">Average Package</p>
                            </div>
                             <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-3xl font-bold text-green-600">{college.placements.placementPercentage}%</p>
                                <p className="text-slate-500">Placement Rate</p>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mt-8 mb-4">Top Recruiters</h4>
                        <div className="flex flex-wrap gap-4">
                            {college.placements.topRecruiters.map(recruiter => (
                                <span key={recruiter} className="px-4 py-2 bg-slate-100 rounded-full font-semibold">{recruiter}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'Overview':
            default:
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold mb-4">About {college.name}</h3>
                        <p className="text-slate-600 leading-relaxed">{college.description}</p>
                    </div>
                );
        }
    };

    return (
        <div>
            {/* Hero Banner */}
            <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(${college.imageUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[--primary-dark]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h1 className="text-5xl font-extrabold">{college.name}</h1>
                    <p className="text-lg">{college.location} | Estd. {college.established}</p>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex border-b">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-6 font-semibold transition-colors duration-300 ${
                                    activeTab === tab 
                                        ? 'border-b-4 border-[--primary-medium] text-[--primary-medium]' 
                                        : 'text-slate-500 hover:text-[--primary-medium]'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default DetailPage;