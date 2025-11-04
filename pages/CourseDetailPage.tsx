import React from 'react';
import type { View, College } from '../types';

interface CourseDetailPageProps {
    courseName: string;
    allColleges: College[];
    setView: (view: View) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseName, allColleges, setView }) => {

    const collegesOfferingCourse = allColleges.filter(college =>
        college.courses.some(course => course.name === courseName)
    );

    // Dummy data for course details
    const courseDetails = {
        description: `An in-depth program focusing on the design, development, and application of software systems. Students learn about algorithms, data structures, programming languages, and computer networks.`,
        eligibility: "10+2 with Physics, Chemistry, and Mathematics (PCM) with a minimum of 60% marks. Admission is typically through entrance exams.",
        careerProspects: ["Software Developer", "Data Scientist", "System Architect", "Cybersecurity Analyst", "AI/ML Engineer"],
    };

    return (
        <div>
            {/* Hero Banner */}
            <div className="bg-[--primary-medium] text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <button onClick={() => setView({ page: 'courses' })} className="mb-4 font-semibold hover:underline">
                        &larr; Back to Courses
                    </button>
                    <h1 className="text-5xl font-extrabold">{courseName}</h1>
                    <p className="mt-2 text-lg text-blue-200">Everything you need to know about pursuing {courseName}.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <main className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border">
                        <h2 className="text-2xl font-bold mb-4">About the Course</h2>
                        <p className="text-slate-600 leading-relaxed">{courseDetails.description}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border">
                        <h2 className="text-2xl font-bold mb-4">Eligibility Criteria</h2>
                        <p className="text-slate-600 leading-relaxed">{courseDetails.eligibility}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border">
                        <h2 className="text-2xl font-bold mb-4">Career Prospects</h2>
                        <div className="flex flex-wrap gap-3">
                            {courseDetails.careerProspects.map(prospect => (
                                <span key={prospect} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1.5 rounded-full">{prospect}</span>
                            ))}
                        </div>
                    </div>
                </main>
                
                {/* Sidebar with Colleges */}
                <aside className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md sticky top-24 border">
                        <h3 className="text-2xl font-bold mb-4">Colleges Offering this Course</h3>
                        {collegesOfferingCourse.length > 0 ? (
                            <ul className="space-y-4">
                                {collegesOfferingCourse.map(college => (
                                    <li key={college.id} className="border-b pb-4 last:border-b-0">
                                        <div className="flex items-center space-x-4">
                                            <img src={college.logoUrl} alt={college.name} className="h-12 w-12 rounded-full" />
                                            <div>
                                                <p className="font-bold text-slate-800">{college.name}</p>
                                                <button 
                                                    onClick={() => setView({ page: 'detail', collegeId: college.id })} 
                                                    className="text-sm text-[--primary-medium] font-semibold hover:underline"
                                                >
                                                    View Details &rarr;
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-500">No colleges found offering this specific course in our database.</p>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CourseDetailPage;