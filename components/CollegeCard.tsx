import React from 'react';
import type { College, View } from '../types';

interface CollegeCardProps {
    college: College;
    setView: (view: View) => void;
    onCompareToggle?: (id: number) => void;
    isCompared?: boolean;
    isListingCard?: boolean;
    onOpenApplyNow?: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <svg key={`full-${i}`} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
            {halfStar && <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
            {[...Array(emptyStars)].map((_, i) => <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
        </div>
    );
};

const CollegeCard: React.FC<CollegeCardProps> = ({ college, setView, onCompareToggle, isCompared, isListingCard = false, onOpenApplyNow }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group border border-slate-200/80">
            <div className="relative">
                <img src={college.imageUrl} alt={college.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4">
                    <img src={college.logoUrl} alt={`${college.name} logo`} className="h-16 w-16 rounded-lg bg-white p-1 shadow-md" />
                </div>
                 {isListingCard && onCompareToggle && (
                    <div className="absolute top-4 right-4">
                        <label className="flex items-center space-x-2 cursor-pointer bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <input
                                type="checkbox"
                                checked={isCompared}
                                onChange={() => onCompareToggle(college.id)}
                                className="form-checkbox h-5 w-5 text-[--primary-medium] rounded border-gray-300 focus:ring-[--primary-medium]"
                            />
                            <span className="text-sm font-semibold text-slate-700">Compare</span>
                        </label>
                    </div>
                 )}
            </div>
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[--text-primary] leading-tight group-hover:text-[--primary-medium] transition-colors duration-300">{college.name}</h3>
                        <p className="text-sm text-[--text-secondary] mt-1">{college.location}</p>
                    </div>
                </div>

                <div className="flex items-center mt-3 space-x-2">
                    <span className="font-bold text-orange-500">{college.rating}</span>
                    <StarRating rating={college.rating} />
                    <span className="text-sm text-slate-500">({college.reviewCount} reviews)</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {college.highlights.slice(0, 3).map(highlight => (
                        <span key={highlight} className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">{highlight}</span>
                    ))}
                </div>

                {isListingCard ? (
                     <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between gap-3">
                        <button
                            onClick={onOpenApplyNow}
                            className="flex-1 text-center px-4 py-2.5 font-semibold text-[--primary-medium] bg-white rounded-lg border-2 border-[--primary-medium] hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
                        >
                            Apply Now
                        </button>
                        <button
                            onClick={() => setView({ page: 'detail', collegeId: college.id })}
                            className="flex-1 text-center px-4 py-2.5 font-semibold text-white bg-[--accent-green] rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 whitespace-nowrap"
                        >
                            View Details
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Avg. Fees</p>
                            <p className="text-lg font-bold text-slate-800">₹{college.feesRange.min.toLocaleString('en-IN')}/year</p>
                        </div>
                        <button onClick={() => setView({ page: 'detail', collegeId: college.id })} className="px-5 py-2.5 font-semibold text-white bg-[--accent-green] rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform group-hover:scale-105">
                            View Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollegeCard;