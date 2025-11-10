import React from 'react';

const Footer: React.FC = () => {
    const sections = {
        'Top Colleges': ['MBA', 'B.Tech', 'MBBS', 'Design', 'Law'],
        'Top Courses': ['B.Tech', 'BBA', 'LLB', 'MBBS', 'B.Com'],
        'Exams': ['JEE Main', 'NEET', 'CAT', 'GATE', 'UPSC'],
        'Resources': ['Articles', 'News', 'Events', 'Contact Us', 'About Us']
    };

    return (
        <footer className="bg-[--primary-dark] text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 mb-6 md:mb-0">
                        <h2 className="text-3xl font-extrabold text-white">StudyCups Education</h2>
                        <p className="mt-4 text-slate-300 max-w-md">Your one-stop destination for finding the perfect college and course to shape your future.</p>
                        <p className="mt-2 text-slate-300">Contact: +91 8081269969</p>
                        <div className="mt-6">
                            <p className="font-semibold mb-2">Subscribe to our newsletter</p>
                            <form className="flex flex-col sm:flex-row gap-2">
                                <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[--primary-medium]"/>
                                <button type="submit" className="px-5 py-3 font-semibold text-white bg-[--accent-green] rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 whitespace-nowrap">
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                    {Object.entries(sections).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-bold text-lg mb-4 text-slate-200">{title}</h3>
                            <ul className="space-y-3">
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-slate-300 hover:text-[--accent-orange] transition-colors duration-300">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t border-slate-600 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} StudyCups Education. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                         {/* Social Icons would go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;