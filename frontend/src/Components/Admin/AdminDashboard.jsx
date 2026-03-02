import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { getAllBranches, createBranch } from "../../State/Branch/Action";
import { getAllSubjects, createSubject } from "../../State/Subject/Action";
import { getAllResources, createResource } from "../../State/Resource/Action";
import {
  AcademicCapIcon,
  BookOpenIcon,
  HomeIcon,
  BuildingLibraryIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  XMarkIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { toast, Toaster } from "react-hot-toast";
import { SidebarItem } from "./SidebarItem";

/* ================= REUSABLE COMPONENTS ================= */

const ActionCard = ({
  title,
  description,
  buttonText,
  onClick,
  icon,
  gradient,
}) => (
  <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 p-6 rounded-3xl shadow-xl shadow-indigo-100/40 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300 group">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${gradient} text-white shadow-lg`}
    >
      {icon}
    </div>
    <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-slate-500 text-sm mb-6 h-10">{description}</p>
    <button
      onClick={onClick}
      className="w-full bg-slate-50 hover:bg-indigo-50 text-indigo-600 border border-slate-200 hover:border-indigo-200 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors duration-300 active:scale-[0.98]"
    >
      <PlusIcon className="w-4 h-4" strokeWidth={2.5} />
      {buttonText}
    </button>
  </div>
);

const Input = ({ label, name, type = "text", onChange }) => (
  <div>
    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">
      {label}
    </label>
    <input
      type={type}
      name={name}
      required
      onChange={onChange}
      className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium py-3 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm"
    />
  </div>
);

const ActionModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  type,
  branches,
  subjects,
}) => {
  const [formData, setFormData] = useState({
    branchId: "",
    subjectId: "",
    type: "",
    title: "",
    name: "",
    link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData({});
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputStyles =
    "w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium py-3 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm cursor-pointer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white border rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-500"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6">{title}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ================= BRANCH ================= */}
          {type === "Branch" && (
            <>
              <Input label="Branch Name" name="name" onChange={handleChange} />
              <Input label="Branch Code" name="code" onChange={handleChange} />
              <Input
                label="Description"
                name="description"
                onChange={handleChange}
              />
            </>
          )}

          {/* ================= SUBJECT ================= */}
          {type === "Subject" && (
            <>
              <Input label="Subject Name" name="name" onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Academic Year"
                  name="academicYear"
                  type="number"
                  onChange={handleChange}
                />
                <Input
                  label="Semester (1-8)"
                  name="semester"
                  type="number"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">
                  Select Branch
                </label>
                <select
                  name="branchId"
                  value={formData.branchId || ""}
                  onChange={handleChange}
                  required
                  className={inputStyles}
                >
                  <option value="">Select Branch</option>
                  {branches?.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* ================= RESOURCE ================= */}
          {type === "Resource" && (
            <>
              <Input label="Title" name="title" onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="File/Resource Name"
                  name="name"
                  onChange={handleChange}
                />
                <Input label="URL Link" name="link" onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type || ""}
                    onChange={handleChange}
                    required
                    className={inputStyles}
                  >
                    <option value="">Select Type</option>
                    <option value="PDF">PDF</option>
                    <option value="PYQ">PYQ</option>
                    <option value="YOUTUBE">YouTube Link</option>
                    <option value="REFERENCE_BOOK">Reference Book</option>
                    <option value="NOTES">Notes</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">
                    Select Subject
                  </label>
                  <select
                    name="subjectId"
                    value={formData.subjectId || ""}
                    onChange={handleChange}
                    required
                    className={inputStyles}
                  >
                    <option value="">Select Subject</option>
                    {subjects?.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>{" "}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : `Save ${type}`}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ================= MAIN DASHBOARD COMPONENT ================= */

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { branches } = useSelector((state) => state.branch);
  const { subjects } = useSelector((state) => state.subject);
  const { resources } = useSelector((state) => state.resource);

  useEffect(() => {
    dispatch(getAllBranches());
    dispatch(getAllSubjects());
    dispatch(getAllResources());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: "", type: "" });

  const handleOpenModal = (title, type) => {
    setModalConfig({ title, type });
    setIsModalOpen(true);
  };

  const handleAddData = async (newData) => {
    let response;
    try {
      if (modalConfig.type === "Branch") {
        response = await dispatch(createBranch(newData));
      }

      if (modalConfig.type === "Subject") {
        const { branchId, ...subjectData } = newData;

        if (!branchId) {
          toast.error("Please select a branch");
          return;
        }

        response = await dispatch(createSubject(branchId, subjectData));
      }

      if (modalConfig.type === "Resource") {
        const { subjectId, ...resourceData } = newData;

        if (!subjectId) {
          toast.error("Please select a subject");
          return;
        }

        response = await dispatch(createResource(subjectId, resourceData));
      }

      if (response?.success) {
        toast.success(`${modalConfig.type} created successfully 🎉`);
        dispatch(getAllBranches());
        dispatch(getAllSubjects());
        dispatch(getAllResources());
        setIsModalOpen(false);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  // Determine Page Title based on the current URL
  const getPageTitle = () => {
    if (location.pathname.includes("branches")) return "Branches Management";
    if (location.pathname.includes("subjects")) return "Subjects Management";
    if (location.pathname.includes("resources")) return "Resources Management";
    return "Welcome back, Admin 👋";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden font-sans">
      <Toaster position="top-right" />
      {/* Background Blobs */}
      <div className="absolute top-0 left-64 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* ================= SIDEBAR ================= */}
      <div className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl shadow-slate-200/40 p-6 z-10 flex flex-col">
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <AcademicCapIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
            Campus Buddy
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem
            icon={<HomeIcon className="w-5 h-5" />}
            text="Dashboard"
            to="/dashboard"
          />
          <SidebarItem
            icon={<BuildingLibraryIcon className="w-5 h-5" />}
            text="Branches"
            to="/dashboard/branches"
          />
          <SidebarItem
            icon={<BookOpenIcon className="w-5 h-5" />}
            text="Subjects"
            to="/dashboard/subjects"
          />
          <SidebarItem
            icon={<ArrowUpTrayIcon className="w-5 h-5" />}
            text="Resources"
            to="/dashboard/resources"
          />
        </nav>

        <div className="mt-auto border-t border-slate-100 pt-4 space-y-2">
          <SidebarItem
            icon={<ChartBarIcon className="w-5 h-5" />}
            text="Analytics"
            to="/dashboard/analytics"
          />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-8 lg:p-12 z-10 h-screen overflow-y-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold tracking-wide uppercase text-xs mb-4 shadow-sm">
              <span>Admin Panel</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Manage your university branches, subjects, and study materials.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 bg-white border border-slate-200 pl-4 pr-2 py-2 rounded-2xl shadow-sm">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">Srishti Gupta</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white flex items-center justify-center font-bold shadow-md">
              SG
            </div>
          </div>
        </div>

        {/* Conditionally Render the Home Dashboard OR the Nested Pages */}
        {location.pathname === "/dashboard" ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <ActionCard
                title="Create Branch"
                description="Establish new academic departments and branches."
                buttonText="New Branch"
                gradient="from-emerald-400 to-teal-500"
                icon={<BuildingLibraryIcon className="w-6 h-6" />}
                onClick={() => handleOpenModal("Create New Branch", "Branch")}
              />
              <ActionCard
                title="Add Subject"
                description="Assign specific subjects and credit hours to branches."
                buttonText="New Subject"
                gradient="from-blue-400 to-indigo-500"
                icon={<BookOpenIcon className="w-6 h-6" />}
                onClick={() => handleOpenModal("Add New Subject", "Subject")}
              />
              <ActionCard
                title="Upload Resource"
                description="Share PDFs, notes, and previous year questions."
                buttonText="Upload Material"
                gradient="from-amber-400 to-orange-500"
                icon={<ArrowUpTrayIcon className="w-6 h-6" />}
                onClick={() =>
                  handleOpenModal("Upload Study Resource", "Resource")
                }
              />
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-100/40">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
                  Recently Added Resources
                </h3>
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {resources?.length || 0} Items
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs font-bold">
                      <th className="py-4 px-6 rounded-tl-xl">Title</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6">Branch</th>
                      <th className="py-4 px-6 rounded-tr-xl">Date Added</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 divide-y divide-slate-100">
                    {resources?.map((resource) => (
                      <tr
                        key={resource.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="py-4 px-6 font-bold text-slate-800">
                          {resource.title}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`text-xs font-bold px-3 py-1.5 rounded-md border ${
                              resource.type === "PDF"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : resource.type === "PYQ"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : resource.type === "YOUTUBE"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : resource.type === "NOTES"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-purple-50 text-purple-700 border-purple-200"
                            }`}
                          >
                            {resource.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-600">
                          {resource.subject?.branch?.name || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-500">
                          {resource.date
                            ? new Date(resource.date).toLocaleDateString()
                            : "Recently"}
                        </td>
                      </tr>
                    ))}
                    {(!resources || resources.length === 0) && (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-12 text-slate-400"
                        >
                          <DocumentTextIcon className="w-10 h-10 mx-auto mb-3 opacity-20" />
                          <p className="text-sm">
                            No resources found. Click "Upload Material" to add
                            one.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Render the nested routes (BranchPage, SubjectPage, etc.) here */
          <Outlet />
        )}
      </div>

      {/* Floating Action Modal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        type={modalConfig.type}
        onSubmit={handleAddData}
        branches={branches}
        subjects={subjects}
      />
    </div>
  );
};

export default AdminDashboard;
