import React, { useState , useEffect } from 'react';
import { EXAMS_DATA } from '../constants';
import type { View } from '../types';

interface ExamDetailPageProps {
    examId: number;
    setView: (view: View) => void;
}

const ExamDetailPage: React.FC<ExamDetailPageProps> = ({ examId, setView }) => {
    const [exam, setExam] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('Overview');
    const [loading, setLoading] = useState(true);
    
    const tabs = ['Overview', 'Eligibility', 'Syllabus', 'Important Dates']; 

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/exams/${examId}`);
                const json = await res.json();

                if (json.success) {
                    setExam(json.data);
                }
                setLoading(false);
            } catch (err) {
                console.error("Exam API Error:", err);
                setLoading(false);
            }
        };

        fetchExam();
    }, [examId]);

    if (loading) {
        return <p className="text-center p-20 text-lg">Loading exam details...</p>;
    }

    if (!exam) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h2 className="text-2xl font-bold">Exam not found</h2>
                <button onClick={() => setView({ page: 'exams' })} className="mt-4 px-6 py-3 bg-[--primary-medium] text-white font-semibold rounded-lg shadow-md hover:bg-[--primary-dark]">
                    Back to Exams
                </button>
            </div>
        );
    }

    const handleAddToCalendar = (examName: string, eventName: string, dateStr: string) => {
        const monthMap: { [key: string]: number } = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
        
        const parts = dateStr.toLowerCase().split(' ');
        const monthStr = parts[0].substring(0, 3);
        const yearStr = parts.find(p => !isNaN(parseInt(p)) && p.length === 4);

        if (!yearStr || !monthMap.hasOwnProperty(monthStr)) {
            alert("Could not parse the date for the calendar event.");
            return;
        }

        const year = parseInt(yearStr);
        const month = monthMap[monthStr];
        const day = 1; // Default to the 1st of the month
        
        const eventDate = new Date(Date.UTC(year, month, day));
        
        const pad = (num: number) => num.toString().padStart(2, '0');

        const startDate = `${eventDate.getUTCFullYear()}${pad(eventDate.getUTCMonth() + 1)}${pad(eventDate.getUTCDate())}`;
        const endDate = `${eventDate.getUTCFullYear()}${pad(eventDate.getUTCMonth() + 1)}${pad(eventDate.getUTCDate() + 1)}`;

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART;VALUE=DATE:${startDate}`,
            `DTEND;VALUE=DATE:${endDate}`,
            `SUMMARY:${examName} - ${eventName}`,
            `DESCRIPTION:Reminder for ${eventName} for the ${examName} exam. This is a reminder for the general timeframe. Please verify the exact date from the official website.`,
            `LOCATION:Online`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${examName}-${eventName}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Eligibility':
                return (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-3xl font-bold mb-6 text-slate-800">Eligibility Criteria</h3>
                        <div className="prose prose-lg max-w-none">
                             <p>{exam.eligibility}</p>
                        </div>
                    </div>
                );
            case 'Syllabus':
                return (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-3xl font-bold mb-6 text-slate-800">Syllabus</h3>
                        <div className="space-y-8">
                            {exam.syllabus.map(subjectArea => (
                                <div key={subjectArea.subject} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                                    <h4 className="text-2xl font-semibold text-[--primary-medium] mb-4">{subjectArea.subject}</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-slate-600">
                                        {subjectArea.topics.map(topic => 
                                            <li key={topic} className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[--primary-medium] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{topic}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Important Dates':
                return (
                    <div id="important-dates" className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-3xl font-bold mb-6 text-slate-800">Important Dates</h3>
                        <div className="space-y-4">
                            {exam.importantDates.map(item => (
                                <div key={item.event} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center bg-slate-50 hover:bg-white transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[--primary-medium]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 text-lg">{item.event}</p>
                                            <p className="font-bold text-[--primary-medium]">{item.date}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleAddToCalendar(exam.name, item.event, item.date)}
                                        className="p-3 rounded-full hover:bg-slate-200 transition-colors"
                                        title="Add to Calendar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Overview':
            default:
                return (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-3xl font-bold mb-6 text-slate-800">About {exam.name}</h3>
                        <div className="prose prose-lg max-w-none">
                             <p>{exam.description}</p>
                        </div>
                    </div>
                );
        }
    };


    return (
        <div className="bg-slate-50">
            {/* Hero Banner */}
            <div className="relative overflow-hidden text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-r from-[--primary-dark] via-[--primary-medium] to-[--primary-medium]" />
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <button onClick={() => setView({ page: 'exams' })} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-90">
                        <span className="inline-block rounded bg-white/10 px-2 py-1">←</span>
                        Back to All Exams
                    </button>
                    <div className="flex items-center gap-6">
                        <img src={exam.logoUrl} alt={`${exam.name} logo`} className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white p-2 shadow-lg" />
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-sm">{exam.name}</h1>
                            <p className="mt-2 text-base sm:text-lg text-white/80 drop-shadow-sm">Conducted by: {exam.conductingBody}</p>
                        </div>
                    </div>
                    {/* Quick CTAs */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#" className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">Application Guide</a>
                        <a href="#" className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">Download Syllabus</a>
                        <a href="#important-dates" className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">Important Dates</a>
                    </div>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-md shadow-sm border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3 py-2">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-4 sm:px-6 font-semibold rounded-full text-sm sm:text-base transition-all duration-300 ${
                                    activeTab === tab 
                                        ? 'bg-[--primary-medium] text-white shadow' 
                                        : 'text-slate-700 hover:bg-[--primary-medium]/10 hover:text-[--primary-medium]'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content with Sidebar */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {renderTabContent()}
                    </div>
                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Quick Info */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-lg font-bold mb-4">Quick Info</h3>
                            <div className="space-y-3 text-sm text-slate-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Stream</span>
                                    <span className="font-semibold">{exam.stream}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Conducting Body</span>
                                    <span className="font-semibold">{exam.conductingBody}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Exam Date</span>
                                    <span className="font-semibold text-[--primary-medium]">{exam.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Dates */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-lg font-bold mb-4">Upcoming Dates</h3>
                            <ul className="space-y-3">
                                {exam.importantDates.slice(0, 3).map((d) => (
                                    <li key={d.event} className="flex items-center justify-between">
                                        <span className="text-slate-700">{d.event}</span>
                                        <span className="font-semibold text-[--primary-medium]">{d.date}</span>
                                    </li>
                                ))}
                            </ul>
                           
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ExamDetailPage;