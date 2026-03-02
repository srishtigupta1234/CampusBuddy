import React, { useEffect, useMemo } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  BookOpenIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectById } from "../State/Subject/Action";
import { getResourcesBySubject } from "../State/Resource/Action";

const SubjectResources = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  const { subject } = useSelector((state) => state.subject);
  const { resources, isLoading, error } = useSelector(
    (state) => state.resource,
  );

  useEffect(() => {
    console.log(subjectId);
    if (subjectId) {
      dispatch(getSubjectById(subjectId));
      dispatch(getResourcesBySubject(subjectId));
    }
  }, [dispatch, subjectId]);

  // Backend enum mapping
  const typeConfig = {
    NOTES: { title: "Notes", icon: DocumentTextIcon, path: "notes" },
    PDF: { title: "PDF Materials", icon: DocumentTextIcon, path: "pdf" },
    PYQ: {
      title: "Previous Year Questions",
      icon: DocumentTextIcon,
      path: "pyq",
    },
    REFERENCE_BOOK: {
      title: "Reference Books",
      icon: BookOpenIcon,
      path: "book",
    },
    YOUTUBE: { title: "Video Lectures", icon: PlayCircleIcon, path: "video" },
  };

  const dynamicCategories = useMemo(() => {
    if (!resources?.length) return [];

    const counts = {};
    resources.forEach((res) => {
      if (res.type) {
        counts[res.type] = (counts[res.type] || 0) + 1;
      }
    });

    return Object.keys(counts).map((type) => ({
      id: type,
      enumValue: type, // important
      count: counts[type],
      ...(typeConfig[type] || {
        title: type,
        icon: DocumentTextIcon,
      }),
    }));
  }, [resources]);

  // Correct backend mapping
  const subjectName = subject?.name || "Subject Details";
  const branchName = subject?.branch?.name;
  const branchCode = subject?.branch?.code;
  const branchDescription = subject?.branch?.description;
  const semester = subject?.semester;
  const academicYear = subject?.academicYear;
  const formattedSubjectName = subjectName.replace(/\s+/g, "-");

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Loading Resources...
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <section className="w-full min-h-screen bg-white font-sans text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-10 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Subjects</span>
        </button>

        {/* Subject Header */}
        {subject && (
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <div className="flex items-center gap-3 text-[#115e3b] mb-4">
              <BookOpenIcon className="w-10 h-10 stroke-2" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {subjectName}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold tracking-wide">
              {branchName && (
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
                  {branchName}
                </span>
              )}

              {branchCode && (
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
                  {branchCode}
                </span>
              )}

              {semester && (
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
                  Semester {semester}
                </span>
              )}

              {academicYear && (
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
                  AY {academicYear}
                </span>
              )}
            </div>

            {branchDescription && (
              <p className="text-sm text-gray-500 max-w-xl mt-4">
                {branchDescription}
              </p>
            )}
          </div>
        )}

        {/* Resource Categories */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-100 shadow p-6 md:p-10">
          <h2 className="text-2xl font-bold text-[#115e3b] text-center mb-8">
            Available Resources
          </h2>

          {dynamicCategories.length === 0 ? (
            <p className="text-center text-gray-500">
              No resources available for this subject.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {dynamicCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() =>
                    navigate(
                      `/academic/${branchCode}/${semester}/${formattedSubjectName}/${category.enumValue}`,
                    )
                  }
                  className="group flex items-center justify-between p-5 bg-[#f8faf9] hover:bg-[#eff5f1] transition-colors rounded-xl cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <category.icon className="w-6 h-6 text-[#207c4e]" />
                    <span className="text-[1.05rem] font-medium text-gray-800 group-hover:text-[#115e3b] transition-colors">
                      {category.title}
                    </span>

                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </div>

                  <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-[#207c4e] transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubjectResources;
