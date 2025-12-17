import React, { useEffect, useMemo, useState } from "react";
import type { View, College } from "../types";
import { getCollegeImages } from "../collegeImages";

interface DetailPageProps {
  college: College;
  setView: (view: View) => void;
  compareList: number[];
  onCompareToggle: (id: number) => void;
  onOpenApplyNow: () => void;
}

type CollegeDetail = {
  overview?: string;
  courses?: any[];
  fees?: any;
  placements?: any;
  reviews?: any[];
  gallery?: string[];
};

const Stat = ({ label, value }: { label: string; value: any }) => (
  <div className="rounded-xl bg-slate-50 border p-3 text-center">
    <p className="text-lg font-bold text-slate-900">{value}</p>
    <p className="text-xs text-slate-500">{label}</p>
  </div>
);

const InfoRow = ({ label, value }: any) => (
  <div className="flex justify-between text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-semibold text-slate-900">{value}</span>
  </div>
);

const DetailPage: React.FC<DetailPageProps> = ({
  college,
  compareList,
  onCompareToggle,
  setView, 
  onOpenApplyNow,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [detail, setDetail] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestedColleges, setSuggestedColleges] = useState<College[]>([]);
 

  const getRandomColleges = (list: College[], count = 4) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


useEffect(() => {
  const fetchSuggestedColleges = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/colleges?limit=20");
      const json = await res.json();

      if (json.success) {
        // current college ko hata do
        const filtered = json.data.filter(
          (c: College) => c.id !== college.id
        );

        // random 4 pick karo
        setSuggestedColleges(getRandomColleges(filtered, 4));
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchSuggestedColleges();
}, [college.id]);


  const slug = useMemo(
    () =>
      college.name
        .toLowerCase()
        .replace(/\([^)]*\)/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-"),
    [college.name]
  );

  const isCompared = compareList.includes(college.id);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/colleges/${college.id}`
        );
        const json = await res.json();
        if (json.success) setDetail(json.data);
      } catch {}
      setLoading(false);
    };
    load();
  }, [college.id]);

    const handleDownloadBrochure = (collegeId: number) => {
  window.open(
    `http://localhost:5000/api/colleges/${collegeId}/brochure`,
    "_blank"
  );
};
  const tabs = ["Overview", "Courses & Fees", "Placements", "Reviews", "Gallery"];

  /* ===================== TAB CONTENT ===================== */

  const renderTabContent = () => {
    switch (activeTab) {
      case "Courses & Fees":
        return (
          <div className="border rounded-2xl divide-y bg-white">
            {(detail?.courses?.length ? detail.courses : college.courses).map(
              (course: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 flex flex-col md:flex-row justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{course.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {course.duration} • {course.level}
                    </p>
                    {course.eligibility && (
                      <p className="text-xs text-slate-600 mt-1">
                        Eligibility: {course.eligibility}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-[--primary-medium]">
                      {typeof course.fees === "number"
                        ? `₹${course.fees.toLocaleString("en-IN")}`
                        : course.fees}
                    </p>
                    <p className="text-xs text-slate-500">per year</p>
                  </div>
                </div>
              )
            )}
          </div>
        );

      case "Placements":
        return (
          <div className="bg-white rounded-2xl border p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Stat
                label="Highest Package"
                value={
                  detail?.placements?.highest ||
                  college.placements.highestPackage
                }
              />
              <Stat
                label="Average Package"
                value={
                  detail?.placements?.average ||
                  college.placements.averagePackage
                }
              />
              <Stat
                label="Placement Rate"
                value={`${detail?.placements?.rate || college.placements.placementPercentage
                  }%`}
              />
            </div>

            <h4 className="mt-6 font-bold">Top Recruiters</h4>
            <div className="flex flex-wrap gap-2 mt-3">
              {(detail?.placements?.recruiters ||
                college.placements.topRecruiters
              ).map((r: string) => (
                <span
                  key={r}
                  className="px-3 py-1 text-xs rounded-full bg-slate-100"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        );

      case "Reviews":
        return (
          <div className="space-y-4">
            {detail?.reviews?.length ? (
              detail.reviews.map((r, i) => (
                <div key={i} className="bg-white border rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">{r.author}</span>
                    <span className="font-bold text-yellow-500">
                      {r.rating} ★
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{r.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-500 py-10">
                No reviews available
              </div>
            )}
          </div>
        );

      case "Gallery":
        const images =
          detail?.gallery?.length
            ? detail.gallery
            : getCollegeImages(slug);

        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                className="rounded-xl h-40 object-cover border"
              />
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">
                About {college.name}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {loading
                  ? "Loading..."
                  : detail?.overview || college.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <InfoRow label="Established" value={college.established} />
                <InfoRow label="Type" value={college.type} />
                <InfoRow label="Location" value={college.location} />
                <InfoRow
                  label="Rating"
                  value={`${college.rating}/5 (${college.reviewCount})`}
                />
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold mb-3">Fee Structure</h3>
              <p className="text-lg font-bold text-green-700">
                ₹{college.feesRange.min.toLocaleString("en-IN")} – ₹
                {college.feesRange.max.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-slate-500 mt-1">Per year</p>
            </div>
          </div>
        );
    }
  };

  /* ===================== PAGE ===================== */

  return (
    <div>
{/* ================= HERO SECTION ================= */}
<div className="relative mt-[90px] w-[90%] m-auto">

  {/* ===== IMAGE AREA (ONLY HALF SCREEN) ===== */}
  <div className="relative h-[270px] w-full overflow-hidden rounded-[20px]">

    <img
      src={college.imageUrl}
      alt={college.name}
      className="absolute inset-0 w-full h-full object-cover object-center"
    />

    {/* Dark gradient like CollegeWollege */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />

    {/* HERO CONTENT */}
    <div className="relative z-20 h-full flex items-center">
  <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center pb-5 gap-6">

    {/* LEFT CONTENT */}
    <div className="max-w-4xl text-white">

      {/* LOGO + NAME */}
      <div className="flex items-center gap-4 mb-0">
        <img
          src={college.logoUrl}
          alt={college.name}
          className="h-14 w-14 rounded-full bg-white p-2 shadow"
        />

        <h1 className="text-2xl sm:text-3xl md:text-2xl font-extrabold leading-tight">
          {college.name}
        </h1>
      </div>

      {/* META LINE (INLINE WITH SEPARATORS) */}
      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-white/90">

        <span className="flex items-center gap-1 text-[14px]">
          ⭐ {college.rating}
        </span>

        <span className="opacity-60">|</span>

        <span className="flex items-center gap-1 text-[14px]">
          🏫 {college.type} College
        </span>

        <span className="opacity-60">|</span>

        <span className="flex items-center gap-1 text-[14px]">
          📅 Estd. {college.established}
        </span>

        {college.accreditation?.length > 0 && (
          <>
            <span className="opacity-60">|</span>
            <span className="flex items-center gap-1 text-[14px]">
              🏅 {college.accreditation[0]}
            </span>
          </>
        )}

        <span className="opacity-60">|</span>

        <span className="flex items-center gap-1 text-[14px]">
          📍 {college.location}
        </span>
      </div>
    </div>

  
  {/* RIGHT CTA – TOP RIGHT, HORIZONTAL */}
<div className="absolute top-6 right-6 flex items-center gap-3 z-30">

  <button
  onClick={onOpenApplyNow}
  className="
    px-6 py-2.5
    rounded-lg
    bg-blue-600 hover:bg-blue-700
    text-white text-sm font-semibold
    shadow-md
    transition
  "
>
  Enquire Now
</button>


  <button
    onClick={handleDownloadBrochure}
    className="
      px-6 py-2.5
      rounded-lg
      bg-green-600 hover:bg-green-700
      text-white text-sm font-semibold
      shadow-md
      transition
    "
  >
    Brochure
  </button>

</div>


  </div>
</div>

  </div>


  {/* DYNAMIC FEATURED COLLEGES */}
<div className="relative z-30 -mt-20 mb-2">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {suggestedColleges.map(col => (
        <div
          key={col.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          {/* IMAGE */}
          <div className="relative h-28">
            <img
              src={col.imageUrl}
              alt={col.name}
              className="w-full h-full object-cover"
            />

            <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <p className="text-xs text-red-500 font-semibold">
              Applications Closing Soon
            </p>

            <h4 className="font-bold text-sm mt-1 line-clamp-2">
              {col.name}
            </h4>

            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              📍 {col.location}
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="flex items-center gap-1 text-sm">
                ⭐ {col.rating}
              </span>

              <button
                onClick={() =>
                  setView({ page: "college", collegeId: col.id })
                }
                className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</div>

</div>



      {/* TABS */}
      <div className="sticky top-[70px] bg-white z-30 border-b">
        <div className="max-w-7xl mx-auto px-4 flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-semibold text-sm ${activeTab === tab
                  ? "text-[--primary-medium] border-b-4 border-[--primary-medium]"
                  : "text-slate-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{renderTabContent()}</div>

        {/* SIDEBAR */}
        <aside className="space-y-5 sticky top-[120px]">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5">
            <h3 className="font-bold text-lg">Apply Now</h3>
            <p className="text-sm opacity-90 mt-1">
              Get expert admission guidance
            </p>
           <button
  onClick={onOpenApplyNow}
  className="mt-4 w-full bg-white text-blue-700 py-2.5 rounded-lg font-semibold"
>
  Apply Now
</button>

          </div>

          <div className="bg-white border rounded-2xl p-5 space-y-3">
            <InfoRow
              label="Highest Package"
              value={college.placements.highestPackage}
            />
            <InfoRow
              label="Placement Rate"
              value={`${college.placements.placementPercentage}%`}
            />
            <InfoRow label="Type" value={college.type} />
          </div>

          <button
            onClick={() => onCompareToggle(college.id)}
            className={`w-full py-2.5 rounded-xl font-semibold ${isCompared
                ? "bg-green-100 text-green-700"
                : "bg-slate-100"
              }`}
          >
            {isCompared ? "Added to Compare" : "Compare College"}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default DetailPage;
