import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalculatorIcon,
  BookOpenIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  TrashIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  AcademicCapIcon,
  SparklesIcon,
  TableCellsIcon,
  ArrowPathIcon,
  ChartBarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import { addSgpa, getSgpaByUser, deleteSgpa } from "../State/Sgpa/Action";

// Grade scale reference based on official guidelines
const GRADE_SCALE = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
  Ab: 0,
};

const CgpaCalculator = () => {
  const dispatch = useDispatch();

  // Fetch SGPAs from Redux store
  const { sgpaList = [], loading, error } = useSelector((state) => state.sgpa);

  const sgpas = sgpaList || [];
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Data Structure", credits: "4", grade: "A+" },
  ]);

  const [sgpa, setSgpa] = useState("0.00");
  const [cgpa, setCgpa] = useState("0.00");
  const [percentage, setPercentage] = useState("0.00");
  const [isCalculated, setIsCalculated] = useState(false);

  // Load user's SGPA history on mount
  useEffect(() => {
  console.log("SGPA DATA:", sgpas);
}, [sgpas]);
  useEffect(() => {
    dispatch(getSgpaByUser());
  }, []);
useEffect(() => {
  if (!Array.isArray(sgpas) || sgpas.length === 0) {
    setCgpa("0.00");
    setPercentage("0.00");
    return;
  }

  const { totalPoints, totalCredits } = sgpas.reduce(
    (acc, sem) => {
      const credits = parseFloat(sem.credits) || 0;
      const sgpa = parseFloat(sem.sgpa) || 0;

      acc.totalPoints += credits * sgpa;
      acc.totalCredits += credits;

      return acc;
    },
    { totalPoints: 0, totalCredits: 0 }
  );

  if (totalCredits === 0) {
    setCgpa("0.00");
    setPercentage("0.00");
    return;
  }

  const finalCgpa = totalPoints / totalCredits;

  setCgpa(finalCgpa.toFixed(2));
  setPercentage((finalCgpa * 10).toFixed(2));
}, [sgpas]);

  const handleAddSubject = () => {
    const newId =
      subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1;
    setSubjects([
      ...subjects,
      { id: newId, name: "", credits: "", grade: "A" },
    ]);
    setIsCalculated(false);
  };

  const handleRemoveSubject = (id) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
    setIsCalculated(false);
  };

  const handleChange = (id, field, value) => {
    const updatedSubjects = subjects.map((sub) =>
      sub.id === id ? { ...sub, [field]: value } : sub,
    );
    setSubjects(updatedSubjects);
    setIsCalculated(false);
  };

  const calculateGrades = async () => {
    let totalCredits = 0;
    let earnedPoints = 0;

    subjects.forEach((sub) => {
      const credit = parseFloat(sub.credits);
      const gradePoint = GRADE_SCALE[sub.grade];

      if (!isNaN(credit) && credit > 0 && gradePoint !== undefined) {
        totalCredits += credit;
        earnedPoints += credit * gradePoint;
      }
    });

    if (totalCredits > 0) {
      const currentSgpaStr = (earnedPoints / totalCredits).toFixed(2);
      setSgpa(currentSgpaStr);
      setIsCalculated(true);

      // Determine the semester number dynamically
      const nextSemester =
        sgpas.length > 0
          ? Math.max(...sgpas.map((s) => s.semester || 0)) + 1
          : 1;

      const payload = {
        semester: nextSemester,
        sgpa: parseFloat(currentSgpaStr),
        credits: totalCredits,
      };

      try {
        await dispatch(addSgpa(payload));
        // Re-fetch to ensure UI is perfectly synced with the DB
        dispatch(getSgpaByUser());
      } catch (error) {
        toast.error("Failed to save SGPA to database.");
      }
    } else {
      toast.error("Please enter valid credits and grades to calculate SGPA.");
    }
  };

  const handleDeleteSgpa = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this semester record?")
    ) {
      await dispatch(deleteSgpa(id));
      dispatch(getSgpaByUser());
    }
  };

  const printMarksheet = () => window.print();

  const handleReset = () => {
    setSubjects([{ id: 1, name: "", credits: "", grade: "A" }]);
    setSgpa("0.00");
    setIsCalculated(false);
  };

  const getDivision = (calculatedCgpa) => {
    if (sgpas.length === 0 && !isCalculated) return "Awaiting Input";
    const num = parseFloat(calculatedCgpa);
    if (num >= 7.5) return "First Division with Distinction";
    if (num >= 6.0) return "First Division";
    if (num >= 5.0) return "Second Division";
    if (num >= 3.5) return "Pass Division";
    return "Fail";
  };

  return (
    <section className="w-full min-h-screen relative overflow-hidden font-sans py-16 md:py-24 print:bg-white print:py-0">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none print:hidden"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none print:hidden"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold tracking-wide uppercase text-xs mb-6 shadow-sm">
            <SparklesIcon className="w-4 h-4" />
            <span>Academic Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            University{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              CGPA Calculator
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Calculate your SGPA for the current semester and dynamically track
            your overall CGPA based on official guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 print:hidden">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-100/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Current Semester Subjects
                  </h2>
                </div>
                <button
                  onClick={handleAddSubject}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-sm font-bold rounded-xl transition-colors duration-300 border border-indigo-100"
                >
                  <PlusIcon className="w-4 h-4" strokeWidth={2.5} />
                  Add Subject ({subjects.length})
                </button>
              </div>

              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-5">Subject Name</div>
                <div className="col-span-3">Credits</div>
                <div className="col-span-3">Grade</div>
                <div className="col-span-1"></div>
              </div>

              <div className="space-y-4 mb-8">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl border border-slate-100 md:border-none hover:bg-slate-50 transition-colors duration-200 md:px-2 md:py-1"
                  >
                    <div className="md:col-span-5">
                      <label className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1 block">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Data Structure"
                        value={subject.name}
                        onChange={(e) =>
                          handleChange(subject.id, "name", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 text-slate-800 font-medium py-3 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1 block">
                        Credits
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 4"
                        value={subject.credits}
                        onChange={(e) =>
                          handleChange(subject.id, "credits", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 text-slate-800 font-medium py-3 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1 block">
                        Grade
                      </label>
                      <select
                        value={subject.grade}
                        onChange={(e) =>
                          handleChange(subject.id, "grade", e.target.value)
                        }
                        className="w-full bg-white border border-slate-200 text-slate-800 font-medium py-3 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all cursor-pointer shadow-sm appearance-none"
                      >
                        {Object.entries(GRADE_SCALE).map(([grade, points]) => (
                          <option
                            key={grade}
                            value={grade}
                            className="font-medium"
                          >
                            {grade} ({points} pt)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-1 flex justify-end">
                      <button
                        onClick={() => handleRemoveSubject(subject.id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={subjects.length === 1}
                        title="Remove Subject"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                <button
                  onClick={calculateGrades}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
                >
                  <CalculatorIcon className="w-5 h-5" />
                  Calculate & Save Semester
                </button>
                <button
                  onClick={handleReset}
                  className="sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 text-slate-600 py-3.5 px-8 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Reset Form
                </button>
              </div>
            </div>

            <div className="bg-amber-50/80 backdrop-blur-md border border-amber-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-amber-700">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <LightBulbIcon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold">Helpful Tips</h3>
              </div>
              <ul className="space-y-4 text-slate-700 text-sm md:text-base ml-2">
                <li className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Data Entry:</strong> Ensure you are entering the{" "}
                    <strong>Credits</strong> (e.g., 4 or 2) directly from your
                    grade card, not the Grade Points.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Distinction Target:</strong> Aim for a CGPA of 7.50
                    or above in your first attempt to secure a First Division
                    with Distinction.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Percentage Conversion:</strong> Your equivalent
                    percentage is universally calculated by multiplying your
                    CGPA by 10.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 space-y-6 print:col-span-12 print:w-full">
            <div
              id="marksheet"
              className="space-y-6 p-2 -m-2 sm:p-0 sm:m-0 print:p-0 print:m-0"
            >
              <div className="bg-gradient-to-br from-indigo-900 via-slate-800 to-indigo-900 rounded-3xl p-8 text-center shadow-xl text-white relative overflow-hidden border border-indigo-700/50">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

                <h3 className="text-indigo-200 font-semibold mb-3 relative z-10 flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
                  <AcademicCapIcon className="w-5 h-5" /> Overall CGPA
                </h3>

                <div className="flex items-center justify-center gap-3 mb-5 relative z-10">
                  <span className="text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-md">
                    {sgpas.length > 0 ? cgpa : "--"}
                  </span>
                </div>

                <div className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold tracking-wide mb-3 relative z-10 border border-white/10 shadow-inner">
                  {getDivision(cgpa)}
                </div>

                <p className="text-sm text-indigo-300/80 relative z-10 mt-3 font-medium">
                  Equivalent Percentage:{" "}
                  <span className="text-white font-bold">
                    {sgpas.length > 0 ? `${percentage}%` : "--"}
                  </span>
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-6 text-center shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <h3 className="text-blue-50 font-semibold mb-2 relative z-10 uppercase tracking-wider text-xs">
                  Current Form SGPA
                </h3>
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <ArrowTrendingUpIcon
                    className="w-8 h-8 text-white/80"
                    strokeWidth={2.5}
                  />
                  <span className="text-5xl font-black text-white drop-shadow-sm tracking-tighter">
                    {isCalculated ? sgpa : "--"}
                  </span>
                </div>
                <p className="text-xs text-blue-100 mt-3 relative z-10 font-medium">
                  Calculated from{" "}
                  {subjects.reduce(
                    (acc, curr) => acc + (parseFloat(curr.credits) || 0),
                    0,
                  )}{" "}
                  Credits
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                  <ChartBarIcon className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold">Semester History</h3>
                </div>

          {Array.isArray(sgpas) && sgpas.length > 0 ? (
  <div className="space-y-3">
    {[...sgpas]
      .sort((a, b) => (a.semester || 0) - (b.semester || 0))
      .map((item, index) => (
        <div
          key={item.id || index}
          className="flex justify-between items-center bg-gradient-to-r from-slate-50 to-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm"
        >
          <div>
            <p className="font-bold text-slate-700">
              Semester {item.semester || index + 1}
            </p>
            <p className="text-xs text-slate-400">
              Total Credits: {item.credits || 0}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-indigo-600">
              {item.sgpa || "0.00"}
            </span>

            <button
              onClick={() => handleDeleteSgpa(item.id)}
              className="text-rose-500 hover:text-rose-700 transition"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
  </div>
) : (
  <div className="text-center py-6 text-slate-400">
    <ChartBarIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
    <p className="text-sm">
      Calculate a semester to start building your history.
    </p>
  </div>
)}
              </div>
            </div>

            <div className="flex gap-3 pt-2 print:hidden">
           
              <button
                onClick={printMarksheet}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors shadow-md active:scale-[0.98]"
              >
                <PrinterIcon className="w-5 h-5" /> Print
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm print:hidden mt-6">
              <div className="flex items-center gap-3 mb-2">
                <TableCellsIcon className="w-6 h-6 text-slate-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Grading System
                </h3>
              </div>
              <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">
                Based on the official absolute marking system.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-xs font-bold">
                    <tr>
                      <th className="py-3 px-4">Grade</th>
                      <th className="py-3 px-4 text-center">Point</th>
                      <th className="py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-black text-emerald-600">
                        O
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">10</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Outstanding
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-black text-emerald-500">
                        A+
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">9</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Excellent
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-black text-blue-600">
                        A
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">8</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Very Good
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-black text-blue-500">
                        B+
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">7</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Good
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-black text-indigo-500">
                        B
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">6</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Above Average
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-black text-amber-500">
                        C
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">5</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Average
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-black text-orange-500">
                        P
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">4</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Pass
                      </td>
                    </tr>
                    <tr className="hover:bg-rose-50/50 transition-colors bg-rose-50/30">
                      <td className="py-2.5 px-4 font-black text-rose-600">
                        F
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">0</td>
                      <td className="py-2.5 px-4 font-medium text-rose-700">
                        Fail
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-100 transition-colors bg-slate-50">
                      <td className="py-2.5 px-4 font-black text-slate-500">
                        Ab
                      </td>
                      <td className="py-2.5 px-4 font-bold text-center">0</td>
                      <td className="py-2.5 px-4 font-medium text-slate-600">
                        Absent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CgpaCalculator;
