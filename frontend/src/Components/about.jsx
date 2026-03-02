import React from "react";
import { 
  LightBulbIcon, 
  FlagIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  CodeBracketIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

// Replace this with your actual image path
import myProfileImg from "../assets/me.png"; 

const About = () => {
  return (
    // Premium background: Soft slate with a glowing radial gradient
    <section id="about" className="w-full min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))] relative overflow-hidden font-sans py-20 md:py-24">
      
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold tracking-wide uppercase text-xs mb-6 shadow-sm">
            <SparklesIcon className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500">Campus Buddy</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
            Your trusted digital companion for academic success, career growth, and student empowerment.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Content (Text Blocks) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Block 1: Who We Are */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center border border-indigo-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                  <LightBulbIcon className="w-7 h-7 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  Who We Are
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  Campus Buddy is a centralized, student-focused platform designed to simplify academic life. We provide easy access to study materials, automated CGPA calculators, attendance trackers, and career opportunities all in one intuitive interface.
                </p>
              </div>
            </div>

            {/* Block 2: Our Mission */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                  <FlagIcon className="w-7 h-7 text-emerald-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  Our Mission
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  Our mission is to empower students with reliable resources, meaningful connections, and the technical guidance required to excel academically and transition seamlessly into the professional tech world.
                </p>
              </div>
            </div>

            {/* Block 3: Why Choose Us */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600" />
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Why Choose Us?
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                  {[
                    "Centralized academic resources",
                    "Automated CGPA & SGPA tools",
                    "Daily Attendance Tracking",
                    "Updated Hackathons & Internships",
                    "Built with React & Spring Boot",
                    "Active campus society updates"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Content (Premium Founder Card) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end h-full">
            <div className="w-full bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-8 shadow-xl shadow-indigo-100/40 hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-2 transition-all duration-500 text-center relative overflow-hidden flex flex-col justify-center">
              
              {/* Card Decoration */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 via-blue-500 to-emerald-400 opacity-90"></div>
              
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-6 mt-10 z-10">
                <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50 blur-md"></div>
                <img
                  src={myProfileImg}
                  alt="Srishti Gupta"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10 bg-white"
                />
                <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md z-20 border border-slate-100">
                  <CodeBracketIcon className="w-5 h-5 text-indigo-600" />
                </div>
              </div>

              {/* Personal Info */}
              <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Srishti Gupta</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600 font-bold text-sm mb-5 uppercase tracking-wider">
                Founder & Full Stack Developer
              </p>
              
              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                  BCA @ Jiwaji University
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                  GSCA @ Google
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100">
                  GSSoC '25 Contributor
                </span>
              </div>

              <p className="text-slate-500 text-sm mb-8 leading-relaxed px-2">
                Passionate about building highly efficient, full-stack applications to solve real-world problems and make university life more productive for students everywhere.
              </p>

              {/* Premium LinkedIn Button */}
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-[#0A66C2] text-white hover:bg-[#004182] font-bold text-sm rounded-xl transition-all duration-300 shadow-md shadow-blue-500/30 hover:shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Connect on LinkedIn
              </a>

            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-900 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl border border-indigo-700/50">
          
          {/* Glowing Accents */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Keep Learning, Keep Growing!
            </h2>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              We are continuously working to expand our resources, automate workflows, and deploy new features to empower the student community.
            </p>
            <a
              href="#resources"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-900 hover:bg-indigo-50 font-bold rounded-2xl shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Campus Buddy
              <ArrowRightIcon className="w-5 h-5 text-indigo-600" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;