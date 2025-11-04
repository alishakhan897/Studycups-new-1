
import React from 'react';
import type { View, College } from '../types';

interface ComparePageProps {
    colleges: College[];
    allColleges: College[];
    setView: (view: View) => void;
}

const ComparePage: React.FC<ComparePageProps> = ({ colleges, allColleges, setView }) => {

    const comparisonFields = [
        { label: 'Rating', key: 'rating', isPlacement: false },
        { label: 'Reviews', key: 'reviewCount', isPlacement: false },
        { label: 'Established', key: 'established', isPlacement: false },
        { label: 'Type', key: 'type', isPlacement: false },
        { label: 'Accreditation', key: 'accreditation', isPlacement: false },
        { label: 'Highest Package', key: 'highestPackage', isPlacement: true },
        { label: 'Average Package', key: 'averagePackage', isPlacement: true },
        { label: 'Placement %', key: 'placementPercentage', isPlacement: true, suffix: '%' },
    ];

    if (colleges.length < 2) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Compare Colleges</h1>
                <p className="text-slate-600 mb-8">Please select at least 2 colleges from the listing page to compare.</p>
                <button onClick={() => setView({ page: 'listing' })} className="px-6 py-3 bg-[--primary-medium] text-white font-semibold rounded-lg shadow-md hover:bg-[--primary-dark]">
                    Go to Colleges
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold mb-8 text-center">College Comparison</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse text-left">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="p-4 w-1/4 font-bold text-lg rounded-tl-xl">Feature</th>
                            {colleges.map((college) => (
                                <th key={college.id} className="p-4 w-1/4">
                                    <div className="flex flex-col items-center text-center">
                                        <img src={college.logoUrl} alt={college.name} className="h-16 w-16 mb-2 rounded-full"/>
                                        <h3 className="font-bold">{college.name}</h3>
                                        <p className="text-sm text-slate-500">{college.location}</p>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFields.map(field => (
                             <tr key={field.key} className="border-b border-gray-200 hover:bg-slate-50">
                                <td className="p-4 font-semibold text-slate-600">{field.label}</td>
                                {colleges.map(college => {
                                    const value = field.isPlacement ? college.placements[field.key as keyof College['placements']] : college[field.key as keyof College];
                                    return (
                                        <td key={`${college.id}-${field.key}`} className="p-4 text-center font-medium">
                                            {/* Fix: Handle rendering array values (like accreditation) by joining them into a string. */}
                                            {Array.isArray(value) ? value.join(', ') : (typeof value === 'string' || typeof value === 'number') ? value : ''}{field.suffix || ''}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparePage;