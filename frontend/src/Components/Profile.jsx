import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from "../State/Attendance/Action";
import { getSgpaByUser } from "../State/Sgpa/Action";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  AcademicCapIcon,
  CheckBadgeIcon,
  ArrowUpRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  FireIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const attendanceRaw = useSelector(
    (state) => state.attendance?.attendance || [],
  );
  const { sgpaList = [] } = useSelector((state) => state.sgpa);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAttendance(user.id));
      dispatch(getSgpaByUser(user.id));
    }
  }, [dispatch, user?.id]);

  // --- DATA PROCESSING ---
  const cgpa = useMemo(() => {
    if (!Array.isArray(sgpaList) || sgpaList.length === 0) return "0.00";
    const { totalPoints, totalCredits } = sgpaList.reduce(
      (acc, sem) => {
        acc.totalPoints +=
          (parseFloat(sem.credits) || 0) * (parseFloat(sem.sgpa) || 0);
        acc.totalCredits += parseFloat(sem.credits) || 0;
        return acc;
      },
      { totalPoints: 0, totalCredits: 0 },
    );
    return totalCredits === 0
      ? "0.00"
      : (totalPoints / totalCredits).toFixed(2);
  }, [sgpaList]);

  const subjectStats = useMemo(() => {
    const subjects = {};
    attendanceRaw.forEach((entry) => {
      const name = entry.subject?.name || "Unknown";
      if (!subjects[name]) subjects[name] = { name, present: 0, total: 0 };
      subjects[name].total += 1;
      if (entry.present) subjects[name].present += 1;
    });
    return Object.values(subjects).map((s) => ({
      ...s,
      percentage: parseFloat(((s.present / s.total) * 100).toFixed(1)),
    }));
  }, [attendanceRaw]);

  const attendanceTotal = useMemo(() => {
    if (!attendanceRaw.length) return 0;
    return (
      (attendanceRaw.filter((a) => a.present).length / attendanceRaw.length) *
      100
    ).toFixed(1);
  }, [attendanceRaw]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-indigo-500/30 pb-20">
      {/* ARTISTIC BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-600/20 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto p-4 md:p-10 relative z-10 space-y-12">
        {/* EYE-CATCHY HERO SECTION */}
        <div className="relative pt-10">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10">
            {/* STUNNING AVATAR */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative h-40 w-40 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || "Srishti"}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="absolute bottom-2 right-2 bg-emerald-500 h-6 w-6 rounded-full border-4 border-slate-900 shadow-lg"
                title="Active Student"
              />
            </div>

            {/* USER IDENTITY */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                Student Academic Dashboard
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-sm">
                {user?.username || user?.name || "Student"}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 font-medium text-sm">
                <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-2xl border border-white/5">
                  <EnvelopeIcon className="w-4 h-4 text-indigo-400" />{" "}
                  {user?.email}
                </span>
                <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-2xl border border-white/5">
                  <AcademicCapIcon className="w-4 h-4 text-emerald-400" />{" "}
                  Jiwaji University
                </span>
              </div>
            </div>

            {/* GPA GLASS BOX */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2.5rem] border border-white/10 text-center shadow-inner min-w-[180px]">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
                Cumulative GPA
              </p>
              <p className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                {cgpa}
              </p>
            </div>
          </div>
        </div>

        {/* METRICS DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            icon={<CheckBadgeIcon />}
            label="Attendance"
            value={`${attendanceTotal}%`}
            sub="Presence Rate"
            color="emerald"
          />
          <MetricCard
            icon={<FireIcon />}
            label="Streak"
            value={`${sgpaList.length}`}
            sub="Semesters"
            color="orange"
          />
          <MetricCard
            icon={<CalendarDaysIcon />}
            label="Credits"
            value={sgpaList.reduce((acc, s) => acc + (s.credits || 0), 0)}
            sub="Total Earned"
            color="indigo"
          />
        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CHART: SGPA PROGRESSION */}
          <div className="lg:col-span-2 bg-slate-800/30 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-white">
                 Academic Performance Overview
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Semester-wise progression trend
                </p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <ArrowUpRightIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sgpaList}>
                  <defs>
                    <linearGradient id="colorSgpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#ffffff05"
                  />
                  <XAxis
                    dataKey="semester"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12, fontWeight: "bold" }}
                    dy={10}
                  />
                  <YAxis
                    domain={[0, 10]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12, fontWeight: "bold" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderRadius: "20px",
                      border: "1px solid #ffffff10",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
                    }}
                    itemStyle={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sgpa"
                    stroke="#6366f1"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorSgpa)"
                    dot={{
                      r: 6,
                      fill: "#6366f1",
                      strokeWidth: 3,
                      stroke: "#0f172a",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SUBJECT CARDS */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-8">Subject Performance</h3>
            <div className="space-y-6">
              {subjectStats.slice(0, 5).map((s, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                    <span className="truncate mr-4">{s.name}</span>
                    <span
                      className={
                        s.percentage >= 75
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }
                    >
                      {s.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${s.percentage >= 75 ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-gradient-to-r from-rose-500 to-orange-400"}`}
                      style={{ width: `${s.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CUSTOM TABLE REGISTRY */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden shadow-xl">
          <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <h3 className="text-xl font-black text-white">Academic Registry</h3>
            <DocumentTextIcon className="w-6 h-6 text-slate-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">Subject Component</th>
                  <th className="px-10 py-6">Lecture Logs</th>
                  <th className="px-10 py-6 text-right">Academic Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subjectStats.map((s, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-all">
                    <td className="px-10 py-6">
                      <p className="font-bold text-white">{s.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                       Academic Record
                      </p>
                    </td>
                    <td className="px-10 py-6 text-slate-400 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-black">
                          {s.present}
                        </span>
                        <span className="opacity-30">/</span>
                        <span>{s.total} Sessions</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <span
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${s.percentage >= 75 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
                      >
                        {s.percentage >= 75
                          ? "In Good Standing"
                          : "Attendance Below Requirement"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, sub, color }) => {
  const colorMap = {
    indigo: "text-indigo-400 bg-indigo-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10",
    orange: "text-orange-400 bg-orange-500/10",
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6 hover:border-white/20 transition-all group">
      <div
        className={`h-14 w-14 rounded-2xl flex items-center justify-center ${colorMap[color]} group-hover:scale-110 transition-transform duration-500`}
      >
        {React.cloneElement(icon, { className: "w-7 h-7" })}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white">{value}</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase">
            {sub}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
