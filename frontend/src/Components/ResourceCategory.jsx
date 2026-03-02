import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  ArrowLeftIcon, 
  ArrowTopRightOnSquareIcon, 
  DocumentTextIcon 
} from "@heroicons/react/24/outline";

const ResourceCategory = () => {
  // Assuming your route is set up to provide these params
  const { branchCode, semester, subjectName, type } = useParams();
  const navigate = useNavigate();

  const { resources } = useSelector((state) => state.resource);

  // Format the subject name and type for display
  const formattedSubjectName = subjectName ? subjectName.replace(/-/g, " ") : "Programming with C";
  
  // Create a nice title from the URL type (e.g., "notes-pdfs" -> "Notes Pdfs")
  const formattedTypeTitle = type 
    ? type.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) 
    : "Notes Pdfs";

  // Filter resources based on type (case-insensitive check to be safe)
  const filteredResources = useMemo(() => {
    if (!resources) return [];
    return resources.filter(
      (res) => res.type && type && res.type.toLowerCase() === type.toLowerCase()
    );
  }, [resources, type]);

  // Convert semester to Year for the badge (e.g., Sem 1 or 2 = Year 1)
  const displayYear = semester ? Math.ceil(parseInt(semester) / 2) : 1;
  const displayBranch = branchCode || "CSE";

  return (
    <section className="w-full min-h-screen bg-white font-sans text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-10 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm w-fit"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            Back to {formattedSubjectName}
          </span>
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-14 text-center">
          
          <div className="flex items-center gap-3 text-[#115e3b] mb-3">
            <DocumentTextIcon className="w-10 h-10 stroke-2" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {formattedTypeTitle}
            </h1>
          </div>
          
          <p className="text-[1.1rem] text-gray-500 mb-4 font-medium">
            {formattedSubjectName}
          </p>
          
          <div className="flex justify-center gap-3 text-xs font-bold tracking-wide">
            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
              {displayBranch}
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
              Year {displayYear}
            </span>
          </div>
        </div>

        {/* List Section */}
        {filteredResources.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No resources available for this category yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {filteredResources.map((res) => (
              <a
                key={res.id}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:border-green-200 hover:shadow-md transition-all"
              >
                <span className="text-[1.15rem] font-bold text-[#115e3b] group-hover:text-[#207c4e] transition-colors">
                  {res.title}
                </span>
                
                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-[#207c4e] transition-colors" />
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ResourceCategory;