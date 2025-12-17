import React, { useEffect, useState, useMemo } from "react";
import type { View } from "../types";
import { useOnScreen } from "../hooks/useOnScreen";

interface ExamsPageProps {
  setView: (view: View) => void;
}

const AnimatedCard: React.FC<{ children: React.ReactNode; delay: number }> = ({
  children,
  delay,
}) => {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isVisible ? "animate-fadeInUp" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ExamsPage: React.FC<ExamsPageProps> = ({ setView }) => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/exams");
        const json = await res.json();
        setExams(json.data || []);
      } catch (err) {
        console.error("Exam API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        exam.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.conductingBody?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        exam.stream === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [exams, searchTerm, selectedCategory]);

  const examCategories = useMemo(() => {
  const set = new Set<string>();

  exams.forEach((exam) => {
    if (exam.stream && typeof exam.stream === "string") {
      set.add(exam.stream.trim());
    }
  });

  return ["All", ...Array.from(set)];
}, [exams]);


  if (loading) {
    return <p className="text-center p-10">Loading Exams...</p>;
  }

  return (
    <div className="bg-[#f2f4f7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-9 space-y-6">

            {/* HEADER */}
            <div className="relative bg-[#eef3fb] rounded-lg p-6 overflow-hidden">
              <div className="relative z-10 max-w-[520px]">
                <h1 className="text-[28px] font-bold text-slate-900">
                  Entrance Exams in India
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Explore all national & state level entrance exams
                </p>
              </div>

              <img
                src="/icons/college entrance exam-bro.png"
                alt=""
                className="
                  absolute right-6 top-1/2 -translate-y-1/2
                  h-[360px] w-auto
                  hidden md:block pointer-events-none
                "
              />
            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-lg p-4 border">
              <input
                placeholder="Search Entrance Exams"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full px-4 py-3 border rounded-md text-sm
                  focus:ring-2 focus:ring-blue-400 outline-none
                "
              />
            </div>

            {/* CATEGORIES */}
            <div className="bg-white rounded-lg p-4 border">
              <h3 className="font-semibold text-slate-800 mb-3">
                Exams Category
              </h3>

            <div className="bg-white rounded-lg p-4 border">
  <h3 className="font-semibold text-slate-800 mb-3">
    Exams Category
  </h3>

  <div className="flex flex-wrap gap-2">
    {examCategories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`
          px-4 py-1.5 text-sm rounded-full transition
          ${
            selectedCategory === cat
              ? "bg-orange-500 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-orange-100 hover:text-orange-700"
          }
        `}
      >
        {cat}
      </button>
    ))}
  </div>
</div>

            </div>

            {/* EXAMS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExams.map((exam, index) => (
                <AnimatedCard key={exam.id} delay={index * 60}>
                  <div
                    onClick={() =>
                      setView({ page: "exam-detail", examId: exam.id })
                    }
                    className="
                      bg-white border rounded-lg p-4
                      hover:shadow-md transition cursor-pointer
                    "
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={exam.logoUrl}
                        alt=""
                        className="h-12 w-12 object-contain"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 text-sm">
                          {exam.name}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {exam.conductingBody}
                        </p>
                      </div>

                      <span className="text-xs px-2 py-1 rounded bg-slate-100">
                        {exam.mode || "Online"}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 text-sm text-slate-600">
                      <span>Exam Date</span>
                      <span className="font-medium text-right">
                        {exam.date || "TBA"}
                      </span>

                      <span>Application</span>
                      <span className="font-medium text-right">
                        Available
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm text-blue-600 font-medium">
                      <span>Application Process</span>
                      <span>Exam Pattern</span>
                    </div>

                    <button
                      className="
                        mt-4 text-sm px-4 py-1.5
                        border border-[#0F2D52]-500
                        text-[#0F2D52]-600 rounded
                        hover:bg-orange-50
                      "
                    >
                      Apply Now
                    </button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="lg:col-span-3 space-y-6 sticky top-28 h-fit">

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Exams News</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <p>CAT 2025 Percentile vs Score</p>
                <p>XAT Admit Card 2026 Released</p>
                <p>JEE Main 2026 Dates Announced</p>
              </div>
            </div>

            <div className="bg-[#0F2D52]-50 border border-[#0F2D52]-200 rounded-lg p-4">
              <h3 className="font-semibold text-white-200">
                Subscribe to our Newsletter
              </h3>
              <button className="mt-4 w-full bg-[#0F2D52] text-white py-2 rounded">
                Subscribe Now
              </button>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Upcoming Exams</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>JEE Advanced 2025</li>
                <li>TS EAMCET 2025</li>
                <li>GATE 2026</li>
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
