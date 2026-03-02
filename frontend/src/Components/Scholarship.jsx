import React from "react";
import { 
  AcademicCapIcon,
  GlobeAltIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const Scholarship = () => {
  const steps = [
    "Register using One‑Time Registration (OTR) on the National Scholarship Portal.",
    "Complete your profile with valid Aadhaar, bank, and academic details.",
    "Select and apply to the schemes you are eligible for.",
    "Submit necessary documents (income, caste, bonafide certificate).",
    "Get verification from your institution (e.g., Jiwaji University nodal officer) and track status online."
  ];

  return (
    // Premium background: Soft slate with a glowing radial gradient
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))] relative overflow-hidden font-sans py-20 md:py-24">
      
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 font-semibold tracking-wide uppercase text-xs mb-6 shadow-sm">
            <SparklesIcon className="w-4 h-4" />
            <span>Financial Aid</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Scholarships & <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
              Financial Support
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Discover official scholarship portals, government schemes, and financial assistance programs available to Jiwaji University students.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* 1. NSP Card */}
          <div className="group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 hover:border-indigo-300/50 transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                <GlobeAltIcon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                National Scholarship Portal
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Official GOI portal for central and state-linked scholarship schemes (pre/post matric, merit/means, SC/ST/OBC).
              </p>
            </div>
            <div className="space-y-3">
              <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-semibold text-sm rounded-xl transition-colors">
                Visit NSP Portal <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
              <a href="https://scholarships.gov.in/otrapplication/#/login-page" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl transition-colors border border-slate-200">
                NSP OTR Registration <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. MP Scholarship Card */}
          <div className="group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:border-emerald-300/50 transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                <BuildingLibraryIcon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                MP Scholarship 2.0
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Madhya Pradesh state schemes including Mukhyamantri Medhavi Vidyarthi Yojana and Gaon Ki Beti.
              </p>
            </div>
            <a href="http://scholarshipportal.mp.nic.in/" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between px-4 py-3 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-semibold text-sm rounded-xl transition-colors">
              Access MP Portal <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>

          {/* 3. PFMS Tracking Card */}
          <div className="group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300/50 transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                <CreditCardIcon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                PFMS Payment Tracking
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Track your direct benefit transfer (DBT) payment status securely once your scholarship is approved.
              </p>
            </div>
            <a href="https://pfms.nic.in/" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between px-4 py-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold text-sm rounded-xl transition-colors">
              Check Payment Status <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* How to Apply Section & Additional Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Step-by-Step Guide */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-[2rem] p-8 md:p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">How to Apply</h2>
            </div>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Official Resources Links */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-10 shadow-xl text-white relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <DocumentTextIcon className="w-8 h-8 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Quick Links</h2>
            </div>

            <ul className="space-y-4 relative z-10">
              <li>
                <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-sm font-bold text-slate-100 group-hover:text-white mb-1">NSP Guidelines</span>
                    <span className="block text-xs text-slate-400">View Central & State criteria</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="http://scholarshipportal.mp.nic.in/Index.aspx" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-sm font-bold text-slate-100 group-hover:text-white mb-1">MP Student Corner</span>
                    <span className="block text-xs text-slate-400">Track MP state applications</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Scholarship;