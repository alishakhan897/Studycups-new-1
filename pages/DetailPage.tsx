
import React, { useEffect, useMemo, useState } from 'react';
import type { View, College, Course } from '../types';
import { getCollegeImages } from '../collegeImages';

interface DetailPageProps {
    college: College;
    setView: (view: View) => void;
}

type CollegeDetail = {
    overview: string;
    courses: Array<{
        name: string;
        duration?: string;
        level?: string;
        fees?: string | number;
        eligibility?: string;
        highlights?: string[];
    }>;
    fees?: {
        tuition?: string;
        hostel?: string;
        exam?: string;
        notes?: string;
    };
    placements?: {
        highest?: string;
        average?: string;
        rate?: string;
        recruiters?: string[];
        highlights?: string[];
    };
    reviews?: Array<{ author: string; rating: number; content: string; source?: string }>;
    gallery?: string[];
};

const DetailPage: React.FC<DetailPageProps> = ({ college, setView }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [detail, setDetail] = useState<CollegeDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const slug = useMemo(() => {
        return college.name
            .toLowerCase()
            .replace(/\([^)]*\)/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }, [college.name]);

    useEffect(() => {
        const controller = new AbortController();
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/data/${slug}.json`, { signal: controller.signal });
                if (!res.ok) throw new Error('Detail not found');
                const json = await res.json();
                setDetail(json);
            } catch (e: any) {
                setError(e.message || 'Failed to load');
            } finally {
                setLoading(false);
            }
        };
        load();
        return () => controller.abort();
    }, [slug]);

    const tabs = ['Overview', 'Courses & Fees', 'Placements', 'Reviews', 'Gallery'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Courses & Fees':
                return (
                    <div className="space-y-4">
                        {(detail?.courses?.length ? detail.courses : college.courses).map((course: any, idx: number) => (
                            <div key={(course.id ?? idx)} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div>
                                        <h4 className="text-xl font-bold text-[--primary-medium]">{course.name}</h4>
                                        <div className="flex gap-x-4 text-sm text-slate-500 mt-2">
                                            {course.duration && <span>Duration: {course.duration}</span>}
                                            {course.level && <span>Level: {course.level}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-left md:text-right">
                                        {course.fees !== undefined && (
                                            <p className="text-lg font-bold">
                                                {typeof course.fees === 'number' ? `₹${course.fees.toLocaleString('en-IN')} / year` : course.fees}
                                            </p>
                                        )}
                                        {course.eligibility && (
                                            <p className="text-sm text-slate-500">Eligibility: {course.eligibility}</p>
                                        )}
                                    </div>
                                </div>
                                {course.highlights?.length ? (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {course.highlights.map((h: string) => (
                                            <span key={h} className="text-xs bg-[--primary-medium]/10 text-[--primary-dark] px-2 py-1 rounded-full">{h}</span>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                        {detail?.fees && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="text-xl font-bold mb-2">Fee Breakdown</h4>
                                <ul className="text-slate-600 space-y-1">
                                    {detail.fees.tuition && <li>Tuition: {detail.fees.tuition}</li>}
                                    {detail.fees.hostel && <li>Hostel: {detail.fees.hostel}</li>}
                                    {detail.fees.exam && <li>Exam/Other: {detail.fees.exam}</li>}
                                    {detail.fees.notes && <li className="text-slate-500 text-sm">{detail.fees.notes}</li>}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'Placements':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold mb-4">Placement Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-[--primary-medium]/10 rounded-lg">
                                <p className="text-3xl font-bold text-[--primary-medium]">{detail?.placements?.highest || college.placements.highestPackage}</p>
                                <p className="text-slate-500">Highest Package</p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg">
                                <p className="text-3xl font-bold text-orange-600">{detail?.placements?.average || college.placements.averagePackage}</p>
                                <p className="text-slate-500">Average Package</p>
                            </div>
                             <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-3xl font-bold text-green-600">{detail?.placements?.rate || `${college.placements.placementPercentage}%`}</p>
                                <p className="text-slate-500">Placement Rate</p>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mt-8 mb-4">Top Recruiters</h4>
                        <div className="flex flex-wrap gap-4">
                            {(detail?.placements?.recruiters?.length ? detail.placements!.recruiters : college.placements.topRecruiters).map(recruiter => (
                                <span key={recruiter} className="px-4 py-2 bg-slate-100 rounded-full font-semibold">{recruiter}</span>
                            ))}
                        </div>
                        {detail?.placements?.highlights?.length ? (
                            <div className="mt-6">
                                <h5 className="font-semibold mb-2">More Highlights</h5>
                                <ul className="list-disc ml-6 text-slate-600 space-y-1">
                                    {detail.placements.highlights.map(h => <li key={h}>{h}</li>)}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                );
            case 'Gallery':
                {
                    const galleryImages = (detail?.gallery?.length ? detail!.gallery : getCollegeImages(slug));
                    return (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold mb-4">Gallery</h3>
                            {galleryImages.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {galleryImages.map((src, idx) => (
                                        <div key={`${src}-${idx}`} className="overflow-hidden rounded-lg border">
                                            <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-600">No gallery images available yet.</p>
                            )}
                        </div>
                    );
                }
            case 'Overview':
            default:
                return (
                    <div className="space-y-6">
                        {/* About */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold mb-4">About {college.name}</h3>
                            {loading ? (
                                <p className="text-slate-500">Loading latest information…</p>
                            ) : error ? (
                                <p className="text-slate-600 leading-relaxed">{college.description}</p>
                            ) : (
                                <p className="text-slate-600 leading-relaxed">{detail?.overview || college.description}</p>
                            )}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-[--primary-medium]"></span>
                                    <span className="font-semibold">Established</span>
                                    <span className="ml-auto">{college.established}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-[--primary-medium]"></span>
                                    <span className="font-semibold">Type</span>
                                    <span className="ml-auto">{college.type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-[--primary-medium]"></span>
                                    <span className="font-semibold">Location</span>
                                    <span className="ml-auto">{college.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-[--primary-medium]"></span>
                                    <span className="font-semibold">Rating</span>
                                    <span className="ml-auto">{college.rating} / 5 ({college.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Highlights */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-3">Key Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="rounded-xl border border-slate-100 p-4">
                                    <p className="text-xs text-slate-500">Accreditations</p>
                                    <p className="mt-1 text-lg font-bold">{college.accreditation.length}</p>
                                </div>
                                <div className="rounded-xl border border-slate-100 p-4">
                                    <p className="text-xs text-slate-500">Courses Offered</p>
                                    <p className="mt-1 text-lg font-bold">{college.courses.length}</p>
                                </div>
                                <div className="rounded-xl border border-slate-100 p-4">
                                    <p className="text-xs text-slate-500">Student Reviews</p>
                                    <p className="mt-1 text-lg font-bold">{college.reviewCount}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {college.highlights.slice(0, 8).map(h => (
                                    <span key={h} className="text-xs bg-[--primary-medium]/10 text-[--primary-medium] px-2 py-1 rounded">{h}</span>
                                ))}
                            </div>
                        </div>

                        {/* Fee Structure */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-3">Fee Structure</h3>
                            <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-lg p-4">
                                <div>
                                    <p className="text-xs text-green-700">Total Fee Range</p>
                                    <p className="text-xl font-bold text-green-800">₹{college.feesRange.min.toLocaleString('en-IN')} - ₹{college.feesRange.max.toLocaleString('en-IN')}</p>
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Per Year</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-500">Fees may vary based on course and category. Scholarships and financial aid available for eligible students.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div>
            {/* Hero Banner */}
            <div className="relative h-80 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${college.imageUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-6 left-6">
                    <img src={college.logoUrl} alt={`${college.name} logo`} className="h-16 w-16 md:h-20 md:w-20 rounded-lg bg-white p-1 shadow-xl" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{college.name}</h1>
                            <p className="mt-1 text-sm md:text-lg text-white/80">{college.location} • Estd. {college.established}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm">
                                <p className="text-xl md:text-2xl font-bold">{college.rating}</p>
                                <p className="text-xs md:text-sm text-white/80">Rating ({college.reviewCount} reviews)</p>
                            </div>
                            <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm">
                                <p className="text-xl md:text-2xl font-bold">₹{college.feesRange.min.toLocaleString('en-IN')}</p>
                                <p className="text-xs md:text-sm text-white/80">Avg. Yearly Fees</p>
                            </div>
                            <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm">
                                <p className="text-xl md:text-2xl font-bold">{(detail?.placements?.recruiters?.length ?? college.placements.topRecruiters.length)}</p>
                                <p className="text-xs md:text-sm text-white/80">Top Recruiters</p>
                            </div>
                        </div>
                    </div>
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {renderTabContent()}
                    </div>
                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-4">College Information</h3>
                            <div className="space-y-3 text-sm text-slate-700">
                                <div className="flex items-center justify-between">
                                    <span>Average Fees</span>
                                    <span className="font-semibold">₹{college.feesRange.min.toLocaleString('en-IN')}/year</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Highest Package</span>
                                    <span className="font-semibold">{detail?.placements?.highest || college.placements.highestPackage}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Average Package</span>
                                    <span className="font-semibold">{detail?.placements?.average || college.placements.averagePackage}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Placement Rate</span>
                                    <span className="font-semibold">{detail?.placements?.rate || `${college.placements.placementPercentage}%`}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Type</span>
                                    <span className="font-semibold">{college.type}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Established</span>
                                    <span className="font-semibold">{college.established}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {college.highlights.slice(0, 6).map(h => (
                                    <span key={h} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">{h}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-3">Top Recruiters</h3>
                            <div className="flex flex-wrap gap-2">
                                {(detail?.placements?.recruiters?.length ? detail.placements!.recruiters : college.placements.topRecruiters).slice(0, 12).map(r => (
                                    <span key={r} className="text-xs font-semibold bg-[--primary-medium]/10 text-[--primary-medium] px-2 py-1 rounded">{r}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-3">Contact Information</h3>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>Phone: <span className="font-semibold">+91 8081269969</span></li>
                                <li>Email: <span className="font-semibold">Support@studycups.in</span></li>
                                <li>Website: <a className="font-semibold text-[--primary-medium]" href="#" onClick={(e) => e.preventDefault()}>Visit Website</a></li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-3">Admission Process</h3>
                            <p className="text-sm text-slate-700">MBA admissions typically require CAT/MAT/CMAT/XAT/NMAT or institute-specific tests plus interviews. Check the college’s official prospectus for exact criteria and timelines.</p>
                            <button className="mt-3 w-full px-4 py-2.5 font-semibold text-white bg-[--primary-medium] rounded-lg hover:bg-[--primary-dark] transition">Download Brochure</button>
                        </div>
                        <div className="bg-[--accent-green] text-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-bold">Need Guidance?</h3>
                            <p className="text-sm text-white/90 mt-1">Talk to our counselor and get personalized advice.</p>
                            <button onClick={() => setView({ page: 'compare' })} className="mt-4 w-full px-4 py-2.5 bg-white text-[--accent-green] font-semibold rounded-lg hover:bg-blue-50 transition">Compare Colleges</button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;