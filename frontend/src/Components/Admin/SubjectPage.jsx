import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubjects,
  deleteSubject,
  updateSubject,
} from "../../State/Subject/Action";

import {
  BookOpenIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const SubjectPage = () => {
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state.subject);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    academicYear: "",
    semester: "",
    branchId: "", // ✅ ADD THIS
  });
  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      dispatch(deleteSubject(id));
    }
  };

  const handleEdit = (subject) => {
    setEditData({
      id: subject.id,
      name: subject.name,
      academicYear: subject.academicYear,
      semester: subject.semester,
      branchId: subject.branch?.id,
    });
    setIsOpen(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateSubject(
        editData.id,
        {
          name: editData.name,
          academicYear: editData.academicYear,
          semester: editData.semester,
        },
        editData.branchId,
      ),
    );

    if (result.success) {
      setIsOpen(false);
    }
  };
  return (
    <div className="space-y-10 animate-fade-in">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 shadow-xl shadow-indigo-100/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <BookOpenIcon className="w-9 h-9 text-indigo-500" />
            Course Subjects
          </h2>
          <p className="text-slate-500 mt-2 text-base">
            Organized by branch, year, and semester.
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-6 py-3 rounded-2xl font-bold shadow-sm">
          {subjects?.length || 0} Total Subjects
        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {subjects?.map((subject) => (
          <div
            key={subject.id}
            className="bg-white/90 backdrop-blur-md border border-slate-200/60 p-7 rounded-3xl shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 group-hover:from-indigo-500 group-hover:to-blue-500 group-hover:text-white transition-all shadow-sm">
                <BookOpenIcon className="w-7 h-7" />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(subject)}
                  className="text-indigo-500 hover:text-indigo-700 transition"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleDelete(subject.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 rounded-xl text-xs font-bold">
              {subject.branch?.code || "N/A"}
            </span>

            <h3 className="text-xl font-bold text-slate-800 mt-4 mb-6 group-hover:text-indigo-600 transition-colors">
              {subject.name}
            </h3>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                  Academic Year
                </p>
                <p className="font-bold text-slate-700">
                  {subject.academicYear}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                  Semester
                </p>
                <p className="font-bold text-slate-700">
                  Sem {subject.semester}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Animated Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="px-8 pt-10 pb-4">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Edit Subject
              </h3>
              <p className="text-slate-500 text-sm font-medium mt-2">
                Update the subject details for the current academic session.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="p-8 pt-4 space-y-6">
              {/* Subject Name Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="e.g. Artificial Intelligence"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Academic Year Input */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Academic Year
                  </label>
                  <input
                    type="number"
                    name="academicYear"
                    value={editData.academicYear}
                    onChange={handleChange}
                    placeholder="2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    required
                  />
                </div>

                {/* Semester Input */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Semester
                  </label>
                  <input
                    type="number"
                    name="semester"
                    value={editData.semester}
                    onChange={handleChange}
                    placeholder="1-8"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all active:scale-95"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-[2] px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
