import React from "react";
import type { View, College } from "../types";

interface ComparePageProps {
  compareList: number[];
  allColleges: College[];
  setView: (view: View) => void;
}


const ComparePage: React.FC<ComparePageProps> = ({
  compareList,
  allColleges,
  setView,
}) => {
  // ✅ SELECT COLLEGES FROM IDS
  const selectedColleges = allColleges.filter(c =>
    compareList.includes(c.id)
  );

  const comparisonFields = [
    { label: "Rating", key: "rating" },
    { label: "Reviews", key: "reviewCount" },
    { label: "Established", key: "established" },
    { label: "Type", key: "type" },
    { label: "Accreditation", key: "accreditation" },
    { label: "Highest Package", key: "highestPackage", placement: true },
    { label: "Average Package", key: "averagePackage", placement: true },
    { label: "Placement %", key: "placementPercentage", placement: true, suffix: "%" },
  ];

  /* ================= EMPTY / ONE COLLEGE ================= */

  if (selectedColleges.length < 2) {
    return (
      <div className="max-w-4xl mx-auto text-center py-40 px-6">
        <h1 className="text-3xl font-bold mb-4">Compare Colleges</h1>

        <p className="text-slate-600 mb-8">
          {selectedColleges.length === 0
            ? "Please select at least 2 colleges from the listing page."
            : "You have selected 1 college. Please add one more to compare."}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setView({ page: "listing" })}
            className="px-6 py-3 bg-[--primary-medium] text-white font-semibold rounded-lg"
          >
            Add College
          </button>
        </div>
      </div>
    );
  }

  /* ================= COMPARISON TABLE ================= */

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold">
          Comparing {selectedColleges.length} Colleges
        </h1>

        {selectedColleges.length < 3 && (
          <button
            onClick={() => setView({ page: "listing" })}
            className="px-5 py-2 bg-slate-200 text-slate-800 rounded-lg font-semibold"
          >
            + Add One More
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse bg-white rounded-xl overflow-hidden shadow">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 text-left font-bold w-1/4">Feature</th>

              {selectedColleges.map(college => (
                <th key={college.id} className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    {college.logoUrl && (
                      <img
                        src={college.logoUrl}
                        alt={college.name}
                        className="h-14 w-14 rounded-full mb-2"
                      />
                    )}
                    <p className="font-bold">{college.name}</p>
                    <p className="text-xs text-slate-500">
                      {college.location}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {comparisonFields.map(field => (
              <tr key={field.key} className="border-t">
                <td className="p-4 font-semibold text-slate-600">
                  {field.label}
                </td>

                {selectedColleges.map(college => {
                  let value: any = "";

                  if (field.placement) {
                    value =
                      college.placements?.[
                        field.key as keyof College["placements"]
                      ];
                  } else {
                    value = college[field.key as keyof College];
                  }

                  return (
                    <td
                      key={`${college.id}-${field.key}`}
                      className="p-4 text-center font-medium"
                    >
                    {value !== undefined && value !== null
  ? Array.isArray(value)
    ? value.join(", ")
    : value
  : "—"}
{value ? field.suffix || "" : ""}

                    </td>
                  );
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
