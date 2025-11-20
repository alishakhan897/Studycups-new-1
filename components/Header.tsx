import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import type { View, College } from '../types';

interface HeaderProps {
    setView: (view: View) => void;
    onOpenApplyNow: () => void;
    colleges: College[];
}

const Header: React.FC<HeaderProps> = ({ setView, onOpenApplyNow, colleges }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Check if on /register route
    const isRegisterRoute = location.pathname === "/register";

    const navLinks = [
        { name: 'Home', view: { page: 'home' } as const },
        { name: 'Colleges', view: { page: 'listing' } as const },
        { name: 'Courses', view: { page: 'courses' } as const },
        { name: 'Exams', view: { page: 'exams' } as const },
        { name: 'Events', view: { page: 'events' } as const },
        { name: 'Blog', view: { page: 'blog' } as const },
        { name: 'Compare', view: { page: 'compare' } as const },
    ];

    // Search results logic
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return colleges
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 5);
    }, [searchQuery, colleges]);

    // Close search dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // On clicking search result item
    const handleResultClick = (collegeId: number) => {
        navigate("/");
        setView({ page: 'detail', collegeId });
        setSearchQuery('');
        setIsSearchOpen(false);
    };

    // Navigation click handler (main fix)
    const handleNavClick = (view: View) => {
        if (isRegisterRoute) {
            // If on /register route, move to homepage and then let App.tsx handle view
            navigate("/");
            setTimeout(() => setView(view), 50);
        } else {
            setView(view);
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-slate-200/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src="/logos/StudyCups.png"
                            alt="StudyCups Education"
                            className="h-10 w-auto cursor-pointer select-none"
                            onClick={() => handleNavClick({ page: 'home' })}
                        />
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div ref={searchRef} className="relative hidden lg:block flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchOpen(true)}
                                placeholder="Search for colleges..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[--primary-medium] transition-all"
                            />
                        </div>

                        {isSearchOpen && searchResults.length > 0 && (
                            <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                                <ul className="py-2">
                                    {searchResults.map(college => (
                                        <li
                                            key={college.id}
                                            onClick={() => handleResultClick(college.id)}
                                            className="px-4 py-3 cursor-pointer hover:bg-slate-50"
                                        >
                                            <p className="font-semibold text-slate-800">{college.name}</p>
                                            <p className="text-xs text-slate-500">{college.location}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center">
                        <nav className="flex items-center space-x-8">
                            {navLinks.map(link => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavClick(link.view)}
                                    className="font-semibold text-[--text-secondary] hover:text-[--primary-medium] transition-colors duration-300"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </nav>

                        <div className="ml-8">
                            <button
                                onClick={onOpenApplyNow}
                                className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-[--accent-green] rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 whitespace-nowrap"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white py-4">
                    {navLinks.map(link => (
                        <button
                            key={link.name}
                            onClick={() => {
                                handleNavClick(link.view);
                                setIsMenuOpen(false);
                            }}
                            className="block w-full text-left px-6 py-2 font-semibold text-slate-600 hover:bg-slate-100"
                        >
                            {link.name}
                        </button>
                    ))}
                    <div className="px-6 py-2">
                        <button
                            onClick={() => {
                                onOpenApplyNow();
                                setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-white bg-[--accent-green] rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
