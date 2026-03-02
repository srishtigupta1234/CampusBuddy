import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  CalculatorIcon,
  TrophyIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Resource = () => {
  return (
    // Premium background: Soft slate with a glowing radial gradient at the top
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans">
      
      {/* Decorative background blobs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold tracking-wide uppercase text-xs mb-6 shadow-sm">
            <SparklesIcon className="w-4 h-4" />
            <span>Campus Buddy Hub</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Everything You Need to <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500">
              Excel in College
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
            Your all-in-one toolkit for academic resources, performance tracking, and campus opportunities.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {/* 1. Academic Resources */}
          <Link 
            to="/academic-resources" 
            className="group flex flex-col justify-between p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 hover:border-indigo-300/50 transition-all duration-500 cursor-pointer"
          >
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                <BookOpenIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                Academic Resources
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                Access curated notes, PDFs, tutorials, PYQs, and helpful video lectures.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-indigo-600 font-bold text-sm">
              <span className="group-hover:tracking-wide transition-all duration-300">Explore Resources</span> 
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* 2. CGPA Calculator */}
          <Link 
            to="/cgpa-calculator" 
            className="group flex flex-col justify-between p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300/50 transition-all duration-500 cursor-pointer"
          >
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                <CalculatorIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                CGPA Calculator
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                Calculate your current SGPA and track your overall CGPA effortlessly.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-blue-600 font-bold text-sm">
              <span className="group-hover:tracking-wide transition-all duration-300">Calculate Now</span> 
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* 3. Attendance Tracker */}
          <Link 
            to="/attendance-tracker" 
            className="group flex flex-col justify-between p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:border-emerald-300/50 transition-all duration-500 cursor-pointer"
          >
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                <CalendarDaysIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                Attendance Tracker
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                Log your daily classes and ensure you stay safely above the 75% eligibility mark.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-emerald-600 font-bold text-sm">
              <span className="group-hover:tracking-wide transition-all duration-300">Track Attendance</span> 
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* 4. Scholarships */}
          <Link 
            to="/scholarships" 
            className="group flex flex-col justify-between p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 hover:border-amber-300/50 transition-all duration-500 cursor-pointer"
          >
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                <TrophyIcon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                Scholarships
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                Discover financial aid, grants, and exclusive scholarship opportunities.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-amber-600 font-bold text-sm">
              <span className="group-hover:tracking-wide transition-all duration-300">View Scholarships</span> 
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* 5. Campus Societies */}
          <Link 
            to="/societies" 
            className="group flex flex-col justify-between p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 hover:border-purple-300/50 transition-all duration-500 cursor-pointer lg:col-span-2 xl:col-span-1"
          >
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                <UserGroupIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                Campus Societies
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                Connect with technical, cultural, and leadership groups across the campus.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between text-purple-600 font-bold text-sm">
              <span className="group-hover:tracking-wide transition-all duration-300">Explore Groups</span> 
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Resource;