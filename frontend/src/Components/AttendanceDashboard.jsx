import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  HandRaisedIcon,
  XMarkIcon,
  TrashIcon,
  ChartPieIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import {
  addAttendance,
  getAttendance,
  deleteAttendance,
} from "../State/Attendance/Action";
import { getAllSubjects } from "../State/Subject/Action";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const AttendanceDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- 1. STATE ---
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const subjects = useSelector((state) =>
    Array.isArray(state.subject?.subjects) ? state.subject.subjects : [],
  );

  const attendance = useSelector((state) =>
    Array.isArray(state.attendance?.attendance)
      ? state.attendance.attendance
      : [],
  );

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllSubjects());
      dispatch(getAttendance());
    }
  }, [user, dispatch]);

  // --- 2. EARLY RETURN FOR UNLOGGED USERS ---
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Track Your Attendance 📊</h2>
          <p className="text-gray-600 mb-6">
            Please login to mark and monitor your attendance.
          </p>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-lg transition-all duration-300 w-full"
          >
            Login to Track Attendance
          </button>
        </div>
        {isAuthOpen && (
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        )}
      </div>
    );
  }

  // --- 3. CALCULATIONS FOR SELECTED SUBJECT ---
  const subjectAttendance = attendance.filter(
    (log) => log.subject?.id === Number(selectedSubjectId),
  );

  const totalClasses = subjectAttendance.length;
  const presentClasses = subjectAttendance.filter((a) => a.present).length;
  const absentClasses = totalClasses - presentClasses;

  const attendancePercentage =
    totalClasses === 0 ? 0 : Math.round((presentClasses / totalClasses) * 100);
  const isEligible = attendancePercentage >= 75;

  const subjectGraphData =
    totalClasses > 0
      ? [
          { name: "Present", value: presentClasses },
          { name: "Absent", value: absentClasses },
        ]
      : [{ name: "No Data", value: 1 }];

  const subjectColors = totalClasses > 0 ? ["#10B981", "#F43F5E"] : ["#F3F4F6"];

  // --- 4. CALCULATIONS FOR OVERALL ANALYTICS (FIXED) ---
  // Only calculate stats for subjects that have at least 1 logged class
  const activeSubjectStats = subjects
    .map((subject) => {
      const records = attendance.filter((a) => a.subject?.id === subject.id);
      const total = records.length;
      const present = records.filter((a) => a.present).length;
      return {
        subjectId: subject.id,
        name: subject.name,
        total,
        present,
        percent: total === 0 ? 0 : Math.round((present / total) * 100),
      };
    })
    .filter((s) => s.total > 0); // Ignore subjects with no attendance data yet

  const eligibleClassesCount = activeSubjectStats.filter(
    (s) => s.percent >= 75,
  ).length;

  const notEligibleClassesCount = activeSubjectStats.filter(
    (s) => s.percent < 75,
  ).length;

  const overallGraphData =
    eligibleClassesCount + notEligibleClassesCount === 0
      ? [{ name: "No Data", value: 1 }]
      : [
          { name: "Eligible", value: eligibleClassesCount },
          { name: "Not Eligible", value: notEligibleClassesCount },
        ];

  const overallColors =
    overallGraphData[0].name === "No Data"
      ? ["#F3F4F6"]
      : ["#6366F1", "#F59E0B"];

  // Bar chart only displays subjects that have data
  const barChartData = activeSubjectStats.map((stat) => ({
    name: stat.name,
    percentage: stat.percent,
  }));

  // --- 5. ACTION HANDLERS ---
  const handleMarkAttendance = async (status) => {
    if (!selectedSubjectId || Number(selectedSubjectId) <= 0) {
      alert("Please select a valid subject!");
      return;
    }

    if (selectedDate > new Date()) {
      alert("You cannot mark attendance for a future date.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];

    try {
      await dispatch(
        addAttendance({
          subjectId: Number(selectedSubjectId),
          attendanceDate: formattedDate,
          present: status === "PRESENT",
        }),
      );

      dispatch(getAttendance());
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  // Fixed Delete Handler: Clears all records for a specific subject
  const handleClearSubjectHistory = async (subjectId, subjectName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ALL attendance records for ${subjectName}? This cannot be undone.`,
      )
    )
      return;

    const recordsToDelete = attendance.filter(
      (a) => a.subject?.id === subjectId,
    );

    try {
      // Dispatch a delete action for every record associated with this subject
      await Promise.all(
        recordsToDelete.map((rec) => dispatch(deleteAttendance(rec.id))),
      );
      dispatch(getAttendance());
    } catch (err) {
      console.error("Error clearing subject attendance:", err);
      alert("Failed to clear history. Please try again.");
    }
  };

  // --- 6. UI RENDER (DASHBOARD) ---
  return (
    <div className="min-h-screen relative overflow-hidden font-sans pb-20">
      <div className="relative mx-auto px-4 md:px-8 z-10 pt-16">
        {/* Friendly Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold tracking-wide uppercase text-xs mb-6 shadow-sm">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>Attendance Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome to your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500">
              Attendance Tracker
            </span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl">
            Let's make sure you stay safely above that 75% mark! Follow the
            steps below to log your daily classes.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* TOP ROW: Guided Marking & Subject Status */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Guided Steps */}
            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg shadow-indigo-100/40 flex-1 border border-slate-200/60">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <AcademicCapIcon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800">Daily Log</h2>
              </div>

              {/* Step 1 */}
              <div className="mb-6">
                <label className="flex items-center text-sm font-bold text-slate-700 mb-3">
                  <span className="bg-indigo-100 text-indigo-700 w-6 h-6 flex items-center justify-center rounded-full mr-3 text-xs">
                    1
                  </span>
                  Which class did you have?
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer text-slate-700 font-medium"
                >
                  <option value="">-- Select a subject --</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2 */}
              <div className="mb-6">
                <label className="flex items-center text-sm font-bold text-slate-700 mb-3">
                  <span className="bg-indigo-100 text-indigo-700 w-6 h-6 flex items-center justify-center rounded-full mr-3 text-xs">
                    2
                  </span>
                  When was it?
                </label>
                <div className="flex justify-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="border-none bg-transparent font-sans"
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <label className="flex items-center text-sm font-bold text-slate-700 mb-4">
                  <span className="bg-indigo-100 text-indigo-700 w-6 h-6 flex items-center justify-center rounded-full mr-3 text-xs">
                    3
                  </span>
                  Were you there?
                </label>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleMarkAttendance("PRESENT")}
                    className="flex-1 bg-emerald-500 text-white py-3.5 rounded-xl hover:bg-emerald-600 font-bold shadow-md shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <HandRaisedIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Yes, Present
                  </button>
                  <button
                    onClick={() => handleMarkAttendance("ABSENT")}
                    className="flex-1 bg-rose-500 text-white py-3.5 rounded-xl hover:bg-rose-600 font-bold shadow-md shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <XMarkIcon
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      strokeWidth={2.5}
                    />
                    No, Absent
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Friendly Pie Chart */}
            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg shadow-indigo-100/40 flex-1 border border-slate-200/60 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-3 mb-2 w-full border-b border-slate-100 pb-4">
                <ChartPieIcon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800">
                  Class Status
                </h2>
              </div>

              {!selectedSubjectId ? (
                <div className="flex flex-col items-center justify-center flex-1 text-slate-400 mt-6 px-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <ChartPieIcon className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-600">
                    No subject selected
                  </h3>
                  <p className="mt-2 text-sm max-w-xs">
                    Pick a class from the dropdown in Step 1 to see how you are
                    doing!
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center mt-4">
                  <div className="w-full h-[250px] min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectGraphData}
                          innerRadius={75}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {subjectGraphData.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={subjectColors[index % subjectColors.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-2 bg-slate-50 w-full py-6 rounded-2xl border border-slate-100 relative overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 w-full h-1 ${totalClasses === 0 ? "bg-slate-300" : isEligible ? "bg-emerald-500" : "bg-rose-500"}`}
                    ></div>

                    <p
                      className="text-5xl font-black mb-2"
                      style={{
                        color:
                          totalClasses === 0
                            ? "#9CA3AF"
                            : isEligible
                              ? "#10B981"
                              : "#F43F5E",
                      }}
                    >
                      {totalClasses === 0 ? "0%" : `${attendancePercentage}%`}
                    </p>

                    <div
                      className="flex items-center justify-center gap-1.5 text-sm font-bold uppercase tracking-wider"
                      style={{
                        color:
                          totalClasses === 0
                            ? "#9CA3AF"
                            : isEligible
                              ? "#10B981"
                              : "#F43F5E",
                      }}
                    >
                      {totalClasses === 0 ? (
                        <>
                          <span>No records yet</span>
                        </>
                      ) : isEligible ? (
                        <>
                          <CheckCircleIcon className="w-5 h-5" />{" "}
                          <span>Safe Zone</span>
                        </>
                      ) : (
                        <>
                          <ExclamationCircleIcon className="w-5 h-5" />{" "}
                          <span>Danger Zone</span>
                        </>
                      )}
                    </div>

                    {totalClasses > 0 && (
                      <p className="text-sm text-slate-500 mt-3 font-medium">
                        You've attended{" "}
                        <span className="font-bold text-slate-700">
                          {presentClasses}
                        </span>{" "}
                        out of{" "}
                        <span className="font-bold text-slate-700">
                          {totalClasses}
                        </span>{" "}
                        classes.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE ROW: Attendance History Table */}
          <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg shadow-indigo-100/40 border border-slate-200/60 w-full">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <FolderOpenIcon className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-800">
                Your Academic Record
              </h2>
            </div>

            {activeSubjectStats.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderOpenIcon className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">
                  Your record is empty
                </h3>
                <p>Start logging classes above to build your history!</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-50/50 text-indigo-900 text-sm uppercase tracking-wider">
                      <th className="p-4 font-bold text-slate-700 border-b border-slate-100">
                        Subject
                      </th>
                      <th className="p-4 font-bold text-slate-700 text-center border-b border-slate-100">
                        Total Classes
                      </th>
                      <th className="p-4 font-bold text-slate-700 text-center border-b border-slate-100">
                        Days Present
                      </th>
                      <th className="p-4 font-bold text-slate-700 text-center border-b border-slate-100">
                        Days Absent
                      </th>
                      <th className="p-4 font-bold text-slate-700 text-center border-b border-slate-100">
                        Current %
                      </th>
                      <th className="p-4 font-bold text-slate-700 text-center border-b border-slate-100">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeSubjectStats.map((stat) => {
                      const isRowEligible = stat.percent >= 75;

                      return (
                        <tr
                          key={stat.subjectId}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="p-4 font-bold text-slate-800">
                            {stat.name}
                          </td>
                          <td className="p-4 text-center text-slate-500 font-medium">
                            {stat.total}
                          </td>
                          <td className="p-4 text-center text-emerald-600 font-bold">
                            {stat.present}
                          </td>
                          <td className="p-4 text-center text-rose-500 font-bold">
                            {stat.total - stat.present}
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${
                                isRowEligible
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                  : "bg-rose-100 text-rose-700 border border-rose-200"
                              }`}
                            >
                              {stat.percent}%
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {/* Fixed Action Button: Clears the subject entirely instead of mapping a trash can for every single class */}
                            <button
                              onClick={() =>
                                handleClearSubjectHistory(
                                  stat.subjectId,
                                  stat.name,
                                )
                              }
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all group"
                              title={`Clear history for ${stat.name}`}
                            >
                              {/* Added w-5 h-5 for proper sizing and group-hover for a nice pop effect */}
                              <TrashIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* BOTTOM ROW: Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Pie Chart */}
            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg shadow-indigo-100/40 border border-slate-200/60 flex flex-col">
              <div className="flex items-center gap-3 mb-2 border-b border-slate-100 pb-4">
                <ChartPieIcon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800">
                  Semester Overview
                </h2>
              </div>

              <p className="text-sm text-slate-500 mb-6 mt-2">
                This chart shows how many of your active subjects have
                attendance above or below the required 75%.
              </p>

              <div className="flex flex-col items-center w-full flex-1">
                <div className="w-full min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={overallGraphData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={5}
                        stroke="none"
                      >
                        {overallGraphData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={overallColors[index % overallColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          `${value} subject(s)`,
                          name,
                        ]}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          padding: "10px 15px",
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => {
                          if (value === "Eligible")
                            return (
                              <span className="text-slate-700 font-medium">
                                Eligible (≥75%)
                              </span>
                            );
                          if (value === "Not Eligible")
                            return (
                              <span className="text-slate-700 font-medium">
                                Not Eligible (&lt;75%)
                              </span>
                            );
                          return value;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 text-center text-slate-600 bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
                  <p className="text-sm font-medium">
                    You have{" "}
                    <span className="font-bold text-indigo-600">
                      {eligibleClassesCount}
                    </span>{" "}
                    subjects safe and{" "}
                    <span className="font-bold text-amber-600">
                      {notEligibleClassesCount}
                    </span>{" "}
                    subjects at risk.
                  </p>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg shadow-indigo-100/40 border border-slate-200/60 flex flex-col">
              <div className="flex items-center gap-3 mb-2 border-b border-slate-100 pb-4">
                <ChartBarIcon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800">
                  Performance by Subject
                </h2>
              </div>

              <p className="text-sm text-slate-500 mb-6 mt-2">
                Compare your exact attendance percentage across your active
                classes side-by-side.
              </p>

              <div className="w-full flex-1 min-h-[300px]">
                {barChartData.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                    No active classes to display yet.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E5E7EB"
                      />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: "#F3F4F6" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="percentage"
                        fill="#6366F1"
                        radius={[6, 6, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAuthOpen && (
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      )}
    </div>
  );
};

export default AttendanceDashboard;
