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
        <div className="min-h-screen bg-slate-50">
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-[--primary-dark]">
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 text-white">
                    <button onClick={() => setView({ page: 'courses' })} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-90">
                        <span className="inline-block rounded bg-white/10 px-2 py-1">←</span>
                        Back to Courses
                    </button>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-sm">{courseName}</h1>
                    <p className="mt-3 text-base sm:text-lg text-white/80 drop-shadow-sm max-w-3xl">Comprehensive management program covering all aspects of business. Everything you need to know about pursuing {courseName}.</p>

                    {/* Quick Stats */}
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Duration</p>
                            <p className="text-lg font-bold">2 years</p>
                        </div>
                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Avg Salary</p>
                            <p className="text-lg font-bold">₹12.0L</p>
                        </div>
                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Top Recruiters</p>
                            <p className="text-lg font-bold">50+</p>
                        </div>
                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Placement Rate</p>
                            <p className="text-lg font-bold">95%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section quick nav (no logic change) */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-3 text-sm">
                    <a href="#duration" className="px-3 py-1 rounded-full border hover:bg-slate-100">Duration</a>
                    <a href="#eligibility" className="px-3 py-1 rounded-full border hover:bg-slate-100">Eligibility</a>
                    <a href="#admission" className="px-3 py-1 rounded-full border hover:bg-slate-100">Admission</a>
                    <a href="#highlights" className="px-3 py-1 rounded-full border hover:bg-slate-100">Highlights</a>
                    <a href="#structure" className="px-3 py-1 rounded-full border hover:bg-slate-100">Structure</a>
                    <a href="#stats" className="px-3 py-1 rounded-full border hover:bg-slate-100">Statistics</a>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <main className="lg:col-span-2 space-y-8">
                    <section id="duration" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">About the Course</h2>
                        <p className="text-slate-600 leading-relaxed">{courseDetails.description}</p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-xs text-slate-500">Program Type</p>
                                <p className="font-semibold">Full-time program</p>
                            </div>
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-xs text-slate-500">Duration</p>
                                <p className="font-semibold">2 years</p>
                            </div>
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-xs text-slate-500">Intake</p>
                                <p className="font-semibold">July - Aug</p>
                            </div>
                        </div>
                    </section>

                    <section id="eligibility" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Eligibility Criteria</h2>
                        <p className="text-slate-600 leading-relaxed">{courseDetails.eligibility}</p>
                    </section>

                    <section id="admission" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Admission Process Timeline</h2>
                        <ol className="space-y-5">
                            {[
                                {t: 'Application Submission', d: 'Submit online application with required documents'},
                                {t: 'Entrance Exam', d: 'Appear for entrance exam (CAT/XAT/GMAT for MBA)'},
                                {t: 'Shortlisting', d: 'Candidates shortlisted based on exam scores'},
                                {t: 'GD/PI Round', d: 'Group Discussion and Personal Interview'},
                                {t: 'Final Selection', d: 'Receive the offer letter and admission confirmation'},
                            ].map((step, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[--primary-light] text-[--primary] font-bold">{idx+1}</span>
                                    <div>
                                        <p className="font-semibold">{step.t}</p>
                                        <p className="text-sm text-slate-600">{step.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section id="highlights" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Course Highlights</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                'Industry-relevant curriculum designed by experts',
                                'Hands-on projects and case studies',
                                'Internships and live corporate projects',
                                'Leadership and communication development',
                                'Career services and placement support',
                                'Global exposure via seminars/webinars',
                            ].map((text) => (
                                <div key={text} className="flex items-start gap-2">
                                    <span className="mt-1 h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">✓</span>
                                    <p className="text-slate-700">{text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Skills You’ll Gain</h2>
                        <div className="flex flex-wrap gap-3">
                            {[
                                'Leadership', 'Strategic Thinking', 'Analytics', 'Negotiation', 'Problem Solving', 'Digital Literacy',
                            ].map((skill) => (
                                <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1.5 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section id="structure" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Course Structure</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-lg border p-4">
                                <p className="font-semibold mb-2">Year 1</p>
                                <ul className="text-sm text-slate-700 space-y-1">
                                    <li>Core management fundamentals</li>
                                    <li>Quantitative methods</li>
                                    <li>Marketing & Operations basics</li>
                                    <li>Communication and leadership labs</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="font-semibold mb-2">Year 2</p>
                                <ul className="text-sm text-slate-700 space-y-1">
                                    <li>Advanced electives & specialization</li>
                                    <li>Capstone industry project</li>
                                    <li>Entrepreneurship & innovation</li>
                                    <li>Placement preparation</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="stats" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6">Course Statistics</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">Students Enrolled</p>
                                <p className="text-2xl font-bold">2,500+</p>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">Placement Rate</p>
                                <p className="text-2xl font-bold">95%</p>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">Recruiters</p>
                                <p className="text-2xl font-bold">50+</p>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">National Ranking</p>
                                <p className="text-2xl font-bold">Top 10</p>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Sidebar with Colleges */}
                <aside className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-xl font-bold">Apply Now</h3>
                        <p className="mt-2 text-sm text-slate-600">Get admission guidance from experts and personalized counseling.</p>
                        <div className="mt-4 flex gap-3">
                            <a href="#admission" className="inline-flex items-center justify-center rounded-md bg-[--primary-medium] px-4 py-2 text-white font-semibold">Apply Now</a>
                            <a href="#duration" className="inline-flex items-center justify-center rounded-md border px-4 py-2 font-semibold">Download Brochure</a>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Colleges Offering this Course</h3>
                        {collegesOfferingCourse.length > 0 ? (
                            <ul className="space-y-4">
                                {collegesOfferingCourse.map(college => (
                                    <li key={college.id} className="border rounded-lg p-3 hover:bg-slate-50 transition">
                                        <div className="flex items-center gap-3">
                                            <img src={college.logoUrl} alt={college.name} className="h-10 w-10 rounded-full border" />
                                            <div className="flex-1">
                                                <p className="font-semibold text-slate-800">{college.name}</p>
                                                <button
                                                    onClick={() => setView({ page: 'detail', collegeId: college.id })}
                                                    className="mt-1 text-xs text-[--primary-medium] font-semibold hover:underline"
                                                >
                                                    View Details →
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