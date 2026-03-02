import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  DocumentDuplicateIcon,
  AcademicCapIcon,
  RectangleGroupIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

/* ---------------- PROFESSIONAL KPI CARD ---------------- */
const KpiCard = ({ title, value, subValue, icon: Icon, color }) => (
  <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:border-indigo-500 transition-all duration-300">
    <div className="relative z-10">
      <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600 inline-block mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <div className="flex items-end gap-3 mt-1">
        <h2 className="text-4xl font-black text-slate-900">{value}</h2>
        <div className="flex items-center text-emerald-500 text-xs font-bold mb-1">
          <ArrowUpIcon className="w-3 h-3" strokeWidth={3} />
          <span>{subValue}</span>
        </div>
      </div>
    </div>
    <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-${color}-500/5 rounded-full blur-3xl group-hover:bg-${color}-500/10 transition-colors`}></div>
  </div>
);

const Analytics = () => {
  const { resources } = useSelector((state) => state.resource);
  const { subjects } = useSelector((state) => state.subject);
  const { branches } = useSelector((state) => state.branch);

  /* ---------------- DATA PROCESSING ---------------- */
  const stats = useMemo(() => {
    const resourceDistribution = resources?.reduce((acc, res) => {
      acc[res.type] = (acc[res.type] || 0) + 1;
      return acc;
    }, {});

    const subjectsPerBranch = branches?.map((b) => ({
      name: b.code,
      count: subjects?.filter((s) => s.branch?.id === b.id).length || 0,
    }));

    return { resourceDistribution, subjectsPerBranch };
  }, [resources, subjects, branches]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Intelligence</h2>
          <p className="text-slate-500 font-medium">Real-time repository metrics and academic distribution.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          LIVE SYSTEM TELEMETRY
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Inventory" value={resources?.length || 0} subValue="12%" icon={DocumentDuplicateIcon} color="indigo" />
        <KpiCard title="Academic Subjects" value={subjects?.length || 0} subValue="8%" icon={AcademicCapIcon} color="blue" />
        <KpiCard title="Active Branches" value={branches?.length || 0} subValue="2%" icon={RectangleGroupIcon} color="emerald" />
        <KpiCard title="Avg per Subject" value={((resources?.length || 0) / (subjects?.length || 1)).toFixed(1)} subValue="5%" icon={ArrowTrendingUpIcon} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RESOURCE TYPE DISTRIBUTION GRAPH (CSS BASED) */}
        <div className="lg:col-span-1 bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white/10 rounded-lg">
              <Square3Stack3DIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold tracking-tight">Asset Distribution</h3>
          </div>
          
          <div className="space-y-6">
            {Object.entries(stats.resourceDistribution || {}).map(([type, count]) => (
              <div key={type} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>{type}</span>
                  <span className="text-white">{count}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(count / resources.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBJECTS PER BRANCH TABLE */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900">Branch Load Analysis</h3>
              <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase">Per Semester Avg</span>
           </div>

           <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="pb-4 text-left">Branch Code</th>
                    <th className="pb-4 text-left">Subject Count</th>
                    <th className="pb-4 text-right">Intensity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {stats.subjectsPerBranch?.map((item) => (
                    <tr key={item.name} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-800">{item.name}</td>
                      <td className="py-4 text-slate-500 font-medium">{item.count} Subjects</td>
                      <td className="py-4 text-right">
                        <span className={`inline-block w-3 h-3 rounded-full ${item.count > 5 ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

      </div>

      {/* RECENT ACTIVITY LOG */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black">Ready for the New Semester?</h3>
              <p className="text-indigo-100 font-medium opacity-80">Audit your resource distribution and ensure all 2026 subjects are populated.</p>
            </div>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-slate-50 transition-all active:scale-95">
              Generate Audit Report
            </button>
         </div>
         <div className="absolute top-0 right-0 w-64 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
      </div>
    </div>
  );
};

export default Analytics;