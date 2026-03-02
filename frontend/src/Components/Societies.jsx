import React from "react";
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  PaintBrushIcon, 
  TrophyIcon, 
  LightBulbIcon, 
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  MegaphoneIcon
} from "@heroicons/react/24/outline";

// Enhanced data with categories, specific icons, and theme colors
const societies = [
  {
    name: "National Service Scheme (NSS)",
    category: "Community Service",
    description: "Unit focused on community service, social awareness camps, blood donation drives, and outreach activities. Engage in educational, environmental, and health initiatives.",
    link: "https://www.facebook.com/NssJiwajiUniversityGwalior/",
    icon: HeartIcon,
    colorTheme: {
      bg: "bg-rose-50",
      icon: "text-rose-600",
      border: "border-rose-100",
      gradient: "from-rose-100 to-rose-50",
      hover: "hover:shadow-rose-500/10 hover:border-rose-300/50"
    }
  },
  {
    name: "National Cadet Corps (NCC)",
    category: "Discipline & Defense",
    description: "Youth wing promoting discipline, leadership, and national service training. Enroll and participate in drill training, national camps, and social programs.",
    link: null,
    icon: ShieldCheckIcon,
    colorTheme: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      border: "border-emerald-100",
      gradient: "from-emerald-100 to-emerald-50",
      hover: "hover:shadow-emerald-500/10 hover:border-emerald-300/50"
    }
  },
  {
    name: "Cultural & Arts Clubs",
    category: "Extracurricular",
    description: "Student-driven societies for music, dance, literature, fine arts, and drama. Express your creativity and represent the university at regional fests.",
    link: null,
    icon: PaintBrushIcon,
    colorTheme: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      border: "border-purple-100",
      gradient: "from-purple-100 to-purple-50",
      hover: "hover:shadow-purple-500/10 hover:border-purple-300/50"
    }
  },
  {
    name: "Sports Teams & Athletics",
    category: "Athletics",
    description: "Compete in intramurals and university tournaments for cricket, football, basketball, and more at the Mahadji Scindia Sports Complex.",
    link: null,
    icon: TrophyIcon,
    colorTheme: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      border: "border-orange-100",
      gradient: "from-orange-100 to-orange-50",
      hover: "hover:shadow-orange-500/10 hover:border-orange-300/50"
    }
  },
  {
    name: "Tech & Innovation Hub",
    category: "Technical",
    description: "Join technical fairs, hackathons, coding workshops, and innovation clubs. Get hands-on exposure to trending technologies and collaborative projects.",
    link: null,
    icon: LightBulbIcon,
    colorTheme: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "border-blue-100",
      gradient: "from-blue-100 to-blue-50",
      hover: "hover:shadow-blue-500/10 hover:border-blue-300/50"
    }
  },
  {
    name: "Departmental Societies",
    category: "Academic",
    description: "Academic departments host their own student bodies—literary forums, subject societies, and business clubs—to organize seminars and peer learning sessions.",
    link: null,
    icon: UserGroupIcon,
    colorTheme: {
      bg: "bg-indigo-50",
      icon: "text-indigo-600",
      border: "border-indigo-100",
      gradient: "from-indigo-100 to-indigo-50",
      hover: "hover:shadow-indigo-500/10 hover:border-indigo-300/50"
    }
  },
];

const Societies = () => {
  return (
    // Premium background: Soft slate with a glowing radial gradient
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))] relative overflow-hidden font-sans py-20 md:py-24">
      
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-600 font-semibold tracking-wide uppercase text-xs mb-6 shadow-sm">
            <SparklesIcon className="w-4 h-4" />
            <span>Campus Life</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Discover <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-rose-500 to-orange-500">
              Societies & Clubs
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Student life at Jiwaji University goes beyond the classroom. Find your community, build your network, and explore your passions.
          </p>
        </div>

        {/* Societies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {societies.map((soc, idx) => {
            const Icon = soc.icon;
            return (
              <div
                key={idx}
                className={`group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full ${soc.colorTheme.hover}`}
              >
                <div>
                  {/* Top Row: Icon & Category Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${soc.colorTheme.gradient} rounded-2xl flex items-center justify-center border ${soc.colorTheme.border} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner`}>
                      <Icon className={`w-7 h-7 ${soc.colorTheme.icon}`} />
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${soc.colorTheme.bg} ${soc.colorTheme.icon} ${soc.colorTheme.border}`}>
                      {soc.category}
                    </span>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors line-clamp-2">
                    {soc.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {soc.description}
                  </p>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                  {soc.link ? (
                    <a
                      href={soc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-bold ${soc.colorTheme.icon} hover:opacity-70 transition-opacity`}
                    >
                      Visit Official Page
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <MegaphoneIcon className="w-4 h-4" />
                      Inquire on campus
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-20 relative overflow-hidden bg-gradient-to-br from-purple-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl border border-purple-700/50">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Want to start your own club?
            </h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              If you have a unique idea for a student organization, you can pitch it to your department heads or the Dean of Student Welfare.
            </p>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-900 hover:bg-purple-50 font-bold rounded-2xl shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300">
              Contact Administration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Societies;