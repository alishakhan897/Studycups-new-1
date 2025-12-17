import React, { useMemo } from "react";
import type { View, College } from "../types";

interface CourseDetailPageProps {
    courseIds: number[];           // NEW: multiple course ids
    courseKey: string;             // NEW: MBA / B.Tech etc.
    allColleges: College[];
    setView: (view: View) => void;
}

const CourseDetailPage = ({ courseIds, courseKey, allColleges, setView }: CourseDetailPageProps) => {

    // ALL matching course objects (from all colleges)
    const matchedCourses = useMemo(() => {
        const arr: any[] = [];
        
        allColleges.forEach(col => {
            col.courses?.forEach(cr => {
                if (courseIds.includes(cr.id)) {
                    arr.push({
                        ...cr,
                        collegeName: col.name,
                        collegeId: col.id,
                        collegeLogo: col.logoUrl
                    });
                }
            });
        });

        return arr;
    }, [courseIds, allColleges]);

    // SHOW 1st course as main data
    const course = matchedCourses[0] || {};

    // Colleges offering this program
    const collegesOfferingCourse = useMemo(() => {
        return matchedCourses.map(c => ({
            id: c.collegeId,
            name: c.collegeName,
            logoUrl: c.collegeLogo
        }));
    }, [matchedCourses]);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ================= HEADER ================= */}
            <div className="relative overflow-hidden bg-[--primary-dark]">
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 text-white">

                    <button onClick={() => setView({ page: "courses" })} className="mb-4 mt-12 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-90">
                        <span className="inline-block rounded bg-white/10 px-2 py-1">←</span>
                        Back to Courses
                    </button>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-sm">
                        {courseKey}
                    </h1>

                    <p className="mt-3 text-base sm:text-lg text-white/80 drop-shadow-sm max-w-3xl">
                        {course.about || "Course details not available."}
                    </p>

                    {/* ==== TOP STATS ==== */}
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">

                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Duration</p>
                            <p className="text-lg font-bold">{course.duration || "N/A"}</p>
                        </div>

                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Avg Salary</p>
                            <p className="text-lg font-bold">{course.statistics?.avgSalary || "N/A"}</p>
                        </div>

                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Top Recruiters</p>
                            <p className="text-lg font-bold">{course.statistics?.recruiters || "N/A"}</p>
                        </div>

                        <div className="rounded-xl bg-white/10 px-4 py-3">
                            <p className="text-xs text-white/80">Placement Rate</p>
                            <p className="text-lg font-bold">{course.statistics?.placementRate || "N/A"}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* NAV LINKS */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-3 text-sm">
                    <a href="#about" className="px-3 py-1 rounded-full border hover:bg-slate-100">About</a>
                    <a href="#eligibility" className="px-3 py-1 rounded-full border hover:bg-slate-100">Eligibility</a>
                    <a href="#admission" className="px-3 py-1 rounded-full border hover:bg-slate-100">Admission</a>
                    <a href="#highlights" className="px-3 py-1 rounded-full border hover:bg-slate-100">Highlights</a>
                    <a href="#structure" className="px-3 py-1 rounded-full border hover:bg-slate-100">Structure</a>
                    <a href="#stats" className="px-3 py-1 rounded-full border hover:bg-slate-100">Statistics</a>
                </div>
            </div>

            {/* ================= BODY ================= */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT CONTENT */}
                <main className="lg:col-span-2 space-y-8">

                    {/* ABOUT */}
                    <section id="about" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">About the Course</h2>
                        <p className="text-slate-600 leading-relaxed">{course.about}</p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-xs text-slate-500">Program Type</p>
                                <p className="font-semibold">{course.programType || "N/A"}</p>
                            </div>
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-xs text-slate-500">Duration</p>
                                <p className="font-semibold">{course.duration || "N/A"}</p>
                            </div>
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-xs text-slate-500">Intake</p>
                                <p className="font-semibold">{course.intake || "N/A"}</p>
                            </div>
                        </div>
                    </section>

                    {/* ELIGIBILITY */}
                    <section id="eligibility" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Eligibility Criteria</h2>
                        <p className="text-slate-600 leading-relaxed">
                            {course.longEligibility || course.eligibility || "Not Available"}
                        </p>
                    </section>

                    {/* ADMISSION */}
                    <section id="admission" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Admission Process</h2>

                        <ol className="space-y-5">
                            {(course.admissionProcess || []).map((step, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[--primary-light] text-[--primary] font-bold">
                                        {step.step}
                                    </span>
                                    <div>
                                        <p className="font-semibold">{step.title}</p>
                                        <p className="text-sm text-slate-600">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* HIGHLIGHTS */}
                    <section id="highlights" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Highlights</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(course.highlights || []).map((text, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <span className="mt-1 h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">✓</span>
                                    <p className="text-slate-700">{text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* STRUCTURE */}
                    <section id="structure" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Course Structure</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {(course.structure || []).map((year, i) => (
                                <div key={i} className="rounded-lg border p-4">
                                    <p className="font-semibold mb-2">{year.year}</p>
                                    <ul className="space-y-1 text-sm text-slate-700">
                                        {year.topics.map((t, j) => <li key={j}>{t}</li>)}
                                    </ul>
                                </div>
                            ))}

                        </div>
                    </section>

                    {/* STATISTICS */}
                    <section id="stats" className="bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6">Course Statistics</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">Students Enrolled</p>
                                <p className="text-lg font-bold">{course.statistics?.studentsEnrolled || "N/A"}</p>
                            </div>

                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">Placement Rate</p>
                                <p className="text-lg font-bold">{course.statistics?.placementRate || "N/A"}</p>
                            </div>

                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">Recruiters</p>
                                <p className="text-lg font-bold">{course.statistics?.recruiters || "N/A"}</p>
                            </div>

                            <div className="rounded-lg border p-4 text-center">
                                <p className="text-xs text-slate-500">Ranking</p>
                                <p className="text-lg font-bold">{course.statistics?.ranking || "N/A"}</p>
                            </div>

                        </div>
                    </section>

                </main>

                {/* ================= SIDEBAR ================= */}
                <aside className="lg:col-span-1 space-y-6">

                    {/* APPLY NOW — SAME UI, NOT TOUCHED */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-xl font-bold">Apply Now</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Get admission guidance from experts and personalized counseling.
                        </p>
                        <div className="mt-4 flex gap-3">
                            <a className="inline-flex items-center justify-center rounded-md bg-[--primary-medium] px-4 py-2 text-white font-semibold">
                                Apply Now
                            </a>
                            <a className="inline-flex items-center justify-center rounded-md border px-4 py-2 font-semibold">
                                Download Brochure
                            </a>
                        </div>
                    </div>

                    {/* COLLEGES OFFERING — FULLY DYNAMIC */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Colleges Offering this Course</h3>

                        {collegesOfferingCourse.length > 0 ? (
                            <ul className="space-y-4">
                                {collegesOfferingCourse.map(college => (
                                    <li key={college.id} className="border rounded-lg p-3 hover:bg-slate-50 transition">
                                        <div className="flex items-center gap-3">
                                            <img src={college.logoUrl} className="h-10 w-10 rounded-full border" />

                                            <div className="flex-1">
                                                <p className="font-semibold text-slate-800">{college.name}</p>

                                                <button
                                                    onClick={() => setView({ page: "detail", collegeId: college.id })}
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
                            <p className="text-slate-500">No colleges found offering this course.</p>
                        )}

                    </div>

                </aside>

            </div>
        </div>
    );
};

export default CourseDetailPage;
