
import React, { useState, Fragment } from 'react';
import type { College, View } from '../types';
import { getAIRecommendations } from '../services/geminiService';

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    colleges: College[];
    setView: (view: View) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, colleges, setView }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ collegeName: string; collegeId: number; }[]>([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError('');
        setResults([]);
        try {
            const recommendations = await getAIRecommendations(query, colleges);
            setResults(recommendations);
        } catch (err) {
            setError('Sorry, I couldn\'t fetch recommendations. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleViewCollege = (collegeId: number) => {
      setView({ page: 'detail', collegeId });
      onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-600 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-[--primary-medium]/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[--primary-medium]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[--text-primary]">AI College Counselor</h2>
                        <p className="text-[--text-secondary]">Describe your ideal college, and I'll find a match for you!</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., 'A top private engineering college in South India with good placements and fees under 4 lakhs per year.'"
                        className="w-full h-24 p-4 rounded-xl border-2 border-slate-300 focus:ring-2 focus:ring-[--primary-medium] focus:border-[--primary-medium] transition-all"
                        disabled={loading}
                    />
                    <button type="submit" className="w-full mt-4 px-6 py-3 font-semibold text-white bg-[--primary-medium] rounded-lg shadow-md hover:bg-[--primary-dark] transition-all duration-300 disabled:bg-gray-400 flex items-center justify-center" disabled={loading}>
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : 'Find My College'}
                    </button>
                </form>

                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                
                <div className="mt-6">
                    {results.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-slate-700">Here are my recommendations:</h3>
                            <div className="space-y-3">
                                {results.map((rec, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 bg-white/50 rounded-lg border border-slate-200">
                                        <p className="font-semibold">{rec.collegeName}</p>
                                        <button onClick={() => handleViewCollege(rec.collegeId)} className="text-sm font-semibold text-[--primary-medium] hover:underline">View Details</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;