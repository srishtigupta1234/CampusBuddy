import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBranches,
  deleteBranch,
  updateBranch,
} from "../../State/Branch/Action";
import {
  BuildingLibraryIcon,
  HashtagIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const BranchPage = () => {
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);

  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getAllBranches());
  }, [dispatch]);

  // Delete Handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      await dispatch(deleteBranch(id));
    }
  };

  // Open Edit Modal
  const handleEditClick = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      code: branch.code,
      description: branch.description,
    });
  };

  // Save Update
  const handleUpdate = async () => {
    const result = await dispatch(
      updateBranch(editingBranch.id, formData)
    );

    if (result.success) {
      setEditingBranch(null);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 shadow-xl shadow-indigo-100/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <BuildingLibraryIcon className="w-9 h-9 text-emerald-500" />
            Academic Branches
          </h2>
          <p className="text-slate-500 mt-2 text-base">
            Browse and manage all registered university departments.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-3 rounded-2xl font-bold shadow-sm">
          {branches?.length || 0} Total Branches
        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {branches?.map((branch) => (
          <div
            key={branch.id}
            className="bg-white/90 backdrop-blur-md border border-slate-200/60 p-7 rounded-3xl shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
          >
            {/* ICON + ACTIONS */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all shadow-sm">
                <BuildingLibraryIcon className="w-7 h-7" />
              </div>

              <div className="flex gap-2">
                {/* Edit */}
                <button
                  onClick={() => handleEditClick(branch)}
                  className="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(branch.id)}
                  className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
              {branch.name}
            </h3>

            <p className="text-slate-500 text-sm mb-6 min-h-[40px]">
              {branch.description || "No description provided."}
            </p>

            <div className="pt-4 border-t border-slate-100">
              <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold">
                <HashtagIcon className="w-4 h-4" />
                Code: {branch.code}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingBranch && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Edit Branch</h3>

            <input
              type="text"
              placeholder="Branch Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            />

            <input
              type="text"
              placeholder="Branch Code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-6 px-4 py-3 border rounded-xl"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingBranch(null)}
                className="px-5 py-2 rounded-xl bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchPage;