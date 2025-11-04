import React, { useState } from 'react';

interface ApplyNowModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ApplyNowModal: React.FC<ApplyNowModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send this data to a server.
        console.log('Form Submitted:', formData);
        setIsSubmitted(true);
    };

    const handleClose = () => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', course: '' });
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={handleClose}>
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
                <button onClick={handleClose} className="absolute top-4 right-4 text-slate-600 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                {!isSubmitted ? (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-full bg-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[--primary-medium]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[--text-primary]">Student Inquiry</h2>
                                <p className="text-[--text-secondary]">Fill out the form below to start your journey.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[--primary-medium] focus:border-[--primary-medium] sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[--primary-medium] focus:border-[--primary-medium] sm:text-sm" />
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                                <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[--primary-medium] focus:border-[--primary-medium] sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-slate-700">Course of Interest</label>
                                <select id="course" name="course" required value={formData.course} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[--primary-medium] focus:border-[--primary-medium] sm:text-sm rounded-md">
                                    <option value="" disabled>Select a course</option>
                                    <option>B.Tech in Computer Science</option>
                                    <option>BBA</option>
                                    <option>MBA</option>
                                    <option>B.Com</option>
                                    <option>MBBS</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full mt-4 px-6 py-3 font-semibold text-white bg-[--accent-green] rounded-lg shadow-md hover:bg-green-700 transition-all duration-300">
                                Submit Inquiry
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="mx-auto bg-green-100 h-16 w-16 rounded-full flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-slate-800">Thank You!</h2>
                        <p className="mt-2 text-slate-600">Your inquiry has been submitted. Our team will get back to you shortly.</p>
                        <button onClick={handleClose} className="mt-6 w-full px-6 py-3 font-semibold text-white bg-[--primary-medium] rounded-lg shadow-md hover:bg-[--primary-dark] transition-all duration-300">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplyNowModal;