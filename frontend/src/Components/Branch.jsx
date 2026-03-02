import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranches } from "../State/Branch/Action";
import { 
  AcademicCapIcon, 
  ArrowRightIcon, 
  ExclamationTriangleIcon,
  SparklesIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";

const Branch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { branches, isLoading, error } = useSelector((state) => state.branch);

  useEffect(() => {
    dispatch(getAllBranches());
  }, [dispatch]);

  return (
    // Premium background: Soft slate with a glowing radial gradient
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans py-20 md:py-24">
      
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold tracking-wide uppercase text-xs mb-6 shadow-sm">
            <SparklesIcon className="w-4 h-4" />
            <span>Academic Programs</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Explore Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500">
              Department
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
            Comprehensive resources, notes, and materials for every discipline at Jiwaji University.
          </p>
        </div>

        {/* ✅ Premium Skeleton Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <div key={skeleton} className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-slate-200/50 shadow-sm animate-pulse flex flex-col h-56">
                <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-4"></div>
                <div>
                  <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-100 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-slate-100 rounded-md w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ❌ Beautiful Error State */}
        {error && (
          <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md border border-rose-200 rounded-3xl p-8 text-center shadow-xl shadow-rose-100/50">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Oops! Connection Issue</h3>
            <p className="text-slate-500 mb-6">{error}</p>
            <button 
              onClick={() => dispatch(getAllBranches())}
              className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-md shadow-rose-200 active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ✅ Branch Cards Grid */}
        {!isLoading && !error && branches && branches.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <div
                key={branch.id || index}
                onClick={() => navigate(`/branch/${branch.id}`)}
                className="group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 hover:border-indigo-300/50 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                
                <div className="relative z-10">
                  {/* Animated Icon Box */}
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                    <AcademicCapIcon className="w-7 h-7 text-indigo-600" />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
                    {branch.name}
                  </h3>
                  
                  {/* ✅ Added Description Here */}
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {branch.description || "Explore resources, notes, and academic materials tailored for this department."}
                  </p>
                </div>

                {/* Bottom Row: Text + Animated Arrow */}
                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-semibold text-indigo-500 group-hover:text-indigo-700 transition-colors duration-300">
                    View Resources
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && branches?.length === 0 && (
          <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-12 text-center shadow-sm mt-8">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpenIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Branches Found</h3>
            <p className="text-slate-500">Check back later or contact the administration to add departments.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Branch;