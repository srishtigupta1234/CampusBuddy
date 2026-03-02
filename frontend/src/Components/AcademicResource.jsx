import React, { useState, useEffect, useMemo } from "react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBranchById } from "../State/Branch/Action";
import { getSubjectsByBranch } from "../State/Subject/Action";

const AcademicResources = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  /* ---------------- REDUX STATE ---------------- */
  const { branch, isLoading, error } = useSelector((state) => state.branch);
  const {
    subjects,
    isLoading: subjectLoading,
    error: subjectError,
  } = useSelector((state) => state.subject);

  /* ---------------- LOCAL STATE ---------------- */
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(1);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (id) {
      dispatch(getBranchById(id));
      dispatch(getSubjectsByBranch(id));
    }
  }, [dispatch, id]);

  /* ---------------- LOGIC ---------------- */
  const availableSemesters = useMemo(() => {
    const startSem = (selectedYear - 1) * 2 + 1;
    return [startSem, startSem + 1];
  }, [selectedYear]);

  useEffect(() => {
    setSelectedSemester(availableSemesters[0]);
  }, [selectedYear, availableSemesters]);

  const filteredSubjects = subjects?.filter(
    (subject) => subject.semester === selectedSemester
  ) || [];

  const displayBranch = branch?.code || "CSE";

  /* ---------------- LOADING / ERROR UI ---------------- */
  if (isLoading || subjectLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115e3b]"></div>
      </div>
    );
  }

  if (error || subjectError) {
    return (
      <div className="text-center mt-20 text-red-500 bg-red-50 p-4 rounded-lg mx-auto max-w-lg">
        <p className="font-bold">Error Loading Data</p>
        <p>{error || subjectError}</p>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <section className="w-full min-h-screen bg-white py-12 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

           {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-10 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Subjects</span>
        </button>

        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-3">
            <AcademicCapIcon className="w-10 h-10 text-[#115e3b]" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-4xl font-bold text-[#115e3b] tracking-tight">
              Academic Resources
            </h1>
          </div>
          <p className="text-[1.1rem] text-gray-500">
            Access comprehensive study materials for all subjects and branches
          </p>
        </div>

        {/* Filters Container */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Branch Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Select Branch
              </label>
              <div className="relative">
                <select 
                  className="w-full border border-gray-200 py-3 px-4 rounded-lg bg-white text-gray-700 appearance-none focus:outline-none focus:border-[#115e3b] focus:ring-1 focus:ring-[#115e3b] transition-all"
                  disabled
                >
                  <option>{displayBranch}</option>
                </select>
                {/* Custom Chevron for select */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Year Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Select Year
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full border border-gray-200 py-3 px-4 rounded-lg bg-white text-gray-700 appearance-none focus:outline-none focus:border-[#115e3b] focus:ring-1 focus:ring-[#115e3b] transition-all cursor-pointer"
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Semester Segmented Tabs */}
        <div className="flex bg-[#f8f9fa] p-1.5 rounded-lg border border-gray-100 mb-8 max-w-full">
          {availableSemesters.map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedSemester === sem
                  ? "bg-white text-gray-800 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Semester {sem}
            </button>
          ))}
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-lg font-medium text-gray-500">
                No subjects found for Semester {selectedSemester}.
              </p>
            </div>
          ) : (
            filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg hover:border-green-100 transition-all flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-[1.15rem] text-[#115e3b] leading-tight pr-4">
                    {subject.name}
                  </h3>
                  <BookOpenIcon className="w-6 h-6 text-[#115e3b] shrink-0" strokeWidth={1.5} />
                </div>

                <div className="mb-8">
                  <span className="text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100 tracking-wide">
                    {displayBranch} - Year {selectedYear}
                  </span>
                </div>

                {/* Navigates to subject resources */}
                <button
                  onClick={() => navigate(`/resource/${subject.id}`)}
                  className="mt-auto w-full bg-[#187e45] hover:bg-[#115e3b] text-white py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  View Resources
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default AcademicResources;