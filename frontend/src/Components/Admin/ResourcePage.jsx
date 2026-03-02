import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllResources,
  deleteResource,
  updateResource,
  createResource,
} from "../../State/Resource/Action";
import { getAllSubjects } from "../../State/Subject/Action";

import {
  DocumentTextIcon,
  FolderIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  PlusIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const ResourcePage = () => {
  const dispatch = useDispatch();
  const { resources } = useSelector((state) => state.resource);
  const { subjects } = useSelector((state) => state.subject);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    type: "PDF",
    subjectId: "",
  });

  useEffect(() => {
    dispatch(getAllResources());
    dispatch(getAllSubjects());
  }, [dispatch]);

  // Statistics Calculation
  const stats = {
    total: resources?.length || 0,
    pdfs: resources?.filter(r => r.type === 'PDF').length || 0,
    videos: resources?.filter(r => r.type === 'YOUTUBE').length || 0,
    notes: resources?.filter(r => r.type === 'NOTES' || r.type === 'PYQ').length || 0,
  };

  const typeConfig = {
    PDF: { color: "rose", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
    YOUTUBE: { color: "blue", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    NOTES: { color: "emerald", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    PYQ: { color: "amber", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  };

  const handleCreateClick = () => {
    setSelectedResource(null);
    setFormData({ title: "", link: "", type: "PDF", subjectId: "" });
    setIsModalOpen(true);
  };

  const handleEditClick = (res) => {
    setSelectedResource(res);
    setFormData({
      title: res.title,
      link: res.link,
      type: res.type,
      subjectId: res.subject?.id || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedResource) {
      dispatch(updateResource(selectedResource.id, formData, formData.subjectId));
    } else {
      dispatch(createResource(formData.subjectId, formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* HEADER & GLOBAL STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-orange-400">
                <FolderIcon className="w-6 h-6" />
                <span className="font-bold tracking-widest text-xs uppercase">Academic Archive</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white">Study Resources</h1>
              <p className="text-slate-400 font-medium max-w-md">Organize and manage your learning materials in one hub.</p>
              <button
                onClick={handleCreateClick}
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
              >
                <PlusIcon className="w-6 h-6" />
                Add New Resource
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* COUNTER CARD */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">Total Materials</p>
                <h2 className="text-6xl font-black text-slate-900 mt-1">{stats.total}</h2>
              </div>
              <div className="p-3 bg-orange-50 rounded-2xl">
                <ChartPieIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-100">
                <div style={{ width: `${(stats.pdfs/stats.total)*100}%` }} className="bg-rose-500 transition-all duration-1000"></div>
                <div style={{ width: `${(stats.videos/stats.total)*100}%` }} className="bg-blue-500 transition-all duration-1000"></div>
                <div style={{ width: `${(stats.notes/stats.total)*100}%` }} className="bg-emerald-500 transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                <span>{stats.pdfs} PDFs</span>
                <span>{stats.videos} Videos</span>
                <span>{stats.notes} Notes</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESOURCE LISTING GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {resources?.map((res) => {
            const style = typeConfig[res.type?.toUpperCase()] || typeConfig.PDF;
            return (
              <div key={res.id} className="group bg-white border border-slate-200 rounded-[2.2rem] p-6 hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 ${style.bg} ${style.text} rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all`}>
                    <DocumentTextIcon className="w-7 h-7" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(res)} className="p-2 text-slate-300 hover:text-blue-600 transition-all"><PencilSquareIcon className="w-5 h-5" /></button>
                    <button onClick={() => dispatch(deleteResource(res.id))} className="p-2 text-slate-300 hover:text-red-600 transition-all"><TrashIcon className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <span className={`px-3 py-1 ${style.bg} ${style.text} text-[10px] font-black uppercase tracking-widest rounded-lg border ${style.border}`}>
                    {res.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 line-clamp-2">{res.title}</h3>
                  <p className="text-slate-400 text-sm font-bold">{res.subject?.name}</p>
                </div>

                <div className="mt-8">
                  <a href={res.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-4 rounded-2xl text-sm font-bold hover:bg-orange-500 transition-all"><ArrowDownTrayIcon className="w-5 h-5" /> Open Material</a>
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL FORM */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{selectedResource ? "Update Resource" : "New Resource"}</h3>
                  <p className="text-slate-500 text-sm font-medium">Add link and assign a subject.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600"><XMarkIcon className="w-7 h-7" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Resource Title</label>
                  <input
                    type="text" required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    placeholder="e.g. Data Structures Notes"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 outline-none"
                    >
                      <option value="PDF">PDF</option>
                      <option value="YOUTUBE">YouTube</option>
                      <option value="NOTES">Notes</option>
                      <option value="PYQ">PYQ</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                    <select
                      required
                      value={formData.subjectId}
                      onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 outline-none"
                    >
                      <option value="">Select Subject</option>
                      {subjects?.map((sub) => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Resource Link</label>
                  <input
                    type="url" required
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 outline-none"
                    placeholder="https://..."
                  />
                </div>

                <button type="submit" className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl">
                  {selectedResource ? "Save Changes" : "Create Resource"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcePage;