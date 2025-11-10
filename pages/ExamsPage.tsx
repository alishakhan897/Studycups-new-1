import React from 'react';
import { EXAMS_DATA } from '../constants';
import type { View } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

interface ExamsPageProps {
    setView: (view: View) => void;
}

const AnimatedCard: React.FC<{children: React.ReactNode, delay: number}> = ({ children, delay }) => {
    // Fix: Removed 'triggerOnce' as it's not a valid property for IntersectionObserverInit. The hook's implementation already ensures it triggers once.
    const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const StreamTag: React.FC<{ stream: string }> = ({ stream }) => {
    const colors: { [key: string]: string } = {
        'Engineering': 'bg-[--primary-medium]/10 text-[--primary-dark]',
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

const ExamsPage: React.FC<ExamsPageProps> = ({ setView }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Entrance Exams 2024-2025</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Find all the information you need about popular entrance exams for various courses.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {EXAMS_DATA.map((exam, index) => (
                    <AnimatedCard key={exam.id} delay={index * 100}>
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
                    </AnimatedCard>
                ))}
            </div>
        </div>
    );
};

export default ExamsPage;