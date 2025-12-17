import React, { useState, useEffect } from 'react';

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "apply" | "brochure";
}

const API_BASE = "http://localhost:5000";

const ApplyNowModal: React.FC<ApplyNowModalProps> = ({ isOpen, onClose, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 🔒 Prevent background scroll */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ✅ ONLY LOGIC FIXED — UI SAME */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          intent: mode, // apply | brochure
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setIsSubmitted(true);

      // 📥 BROCHURE DOWNLOAD (ONLY FOR BROCHURE MODE)
      if (mode === "brochure") {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = "/brochures/sample-brochure.pdf"; // update if dynamic
          link.download = "college-brochure.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 500);
      }

    } catch (err) {
      alert("Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setLoading(false);
    setFormData({ name: '', email: '', phone: '', course: '' });
    onClose();
  };

  if (!isOpen) return null;

  /* ⬇️⬇️⬇️ BELOW JSX = YOUR ORIGINAL UI (UNCHANGED) ⬇️⬇️⬇️ */

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8 relative transform transition-all duration-300 scale-100"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={handleClose} aria-label="Close" className="absolute top-4 right-4 h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!isSubmitted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left: Benefits / Help Section */}
            <div className="hidden md:block border rounded-2xl p-6 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">
                How StudyCups helps you in Admission
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Brochure Details", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 00-2 2v11a2 2 0 002 2h9a2 2 0 002-2V5a2 2 0 00-2-2H4zm2 3h7v2H6V6zm0 4h7v2H6v-2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Check Detailed Fees", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001 1h3a1 1 0 001-1v-2H11v2z" />
                        <path fillRule="evenodd" d="M11 5a1 1 0 011-1h3a1 1 0 011 1v8H11V5zM3 7a1 1 0 011-1h3a1 1 0 011 1v6H3V7z" clipRule="evenodd" />
                      </svg>
                    )
                  },
                  {
                    title: "Shortlist & Apply", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7h2v5H9v-5zm0-4h2v2H9V7z" />
                      </svg>
                    )
                  },
                  {
                    title: "24/7 Counselling", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
                        <path d="M9 9h2v4H9z" />
                      </svg>
                    )
                  },
                  {
                    title: "Scholarships", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3h12v2H4V3zm0 4h12v10l-6-3-6 3V7z" />
                      </svg>
                    )
                  },
                  {
                    title: "Application Deadlines", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1a2 2 0 012 2v2H3V6a2 2 0 012-2h1V3a1 1 0 011-1z" />
                        <path d="M3 9h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                    )
                  }
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <div className="shrink-0">{item.icon}</div>
                    <span className="text-sm font-semibold text-slate-700">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-base font-bold text-slate-800">What people say</h4>

                <div className="mt-3 p-4 bg-white rounded-lg border">
                  <p className="text-sm text-slate-700">
                    StudyCups is a one-stop solution to all your education related queries.
                  </p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">Gurmeet Singh</p>
                </div>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-[--primary-medium]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[--primary-medium]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0A225A]">
                    {mode === "brochure"
                      ? "Register to Download Brochure"
                      : "Register Now To Apply"}
                  </h2>

                  <p className="text-slate-600">Get details and latest updates</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-[--primary-medium] focus:border-[--primary-medium]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-[--primary-medium] focus:border-[--primary-medium]"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-[--primary-medium] focus:border-[--primary-medium]"
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-slate-700">Course Interested In</label>
                    <select
                      id="course"
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 bg-white border border-slate-300 rounded-md focus:ring-[--primary-medium] focus:border-[--primary-medium]"
                    >
                      <option value="" disabled>Select a course</option>
                      <option>B.Tech in Computer Science</option>
                      <option>BBA</option>
                      <option>MBA</option>
                      <option>B.Com</option>
                      <option>MBBS</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-slate-500 flex items-start gap-2">
                  <span className="inline-block mt-0.5 h-3 w-3 rounded-sm bg-blue-500"></span>
                  By submitting this form, you accept and agree to our Terms of Use.
                </p>



              <button
  type="submit"
  disabled={loading}
  className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-60"
>
  {loading
    ? "Submitting..."
    : mode === "brochure"
    ? "REGISTER & DOWNLOAD"
    : "SUBMIT"}
</button>


              </form>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto bg-green-100 h-16 w-16 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-800">Thank You!</h2>
            <p className="mt-2 text-slate-600">Your inquiry has been submitted. Our team will get back to you shortly.</p>

            <button
              onClick={handleClose}
              className="mt-6 w-full px-6 py-3 font-semibold text-white bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplyNowModal;
