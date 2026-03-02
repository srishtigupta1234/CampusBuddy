import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAttendance } from "../State/Attendance/Action";
import { getAllSubjects } from "../State/Subject/Action";
import { useNavigate } from "react-router-dom";
import user from "../State/Auth/Action";

const AttendanceForm = ({ userId }) => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
 const user = useSelector((state) => state.auth.user);
  const subjects = useSelector((state) => state.subject?.subjects || []);

  // ✅ FIXED: State now perfectly matches the backend variables
  const [form, setForm] = useState({
    subjectName: "",
    totalClasses: "",
    presentClasses: "",
  });

  useEffect(() => {
    dispatch(getAllSubjects()); // fetch subjects on load
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedSubject = subjects.find(
      (sub) => sub.name === form.subjectName
    );

    if (!selectedSubject) {
      alert("Subject not found");
      return;
    }

    // Convert strings from inputs to numbers for the backend
    const total = parseInt(form.totalClasses, 10);
    const present = parseInt(form.presentClasses, 10);

    // Optional but highly recommended: Quick validation check
    if (present > total) {
      alert("Present classes cannot be greater than total classes!");
      return;
    }

    // ✅ FIXED: Payload matches backend exactly
    const attendanceData = {
      subjectName: selectedSubject.name,
      totalClasses: total,
      presentClasses: present,
      userId: userId,
    };

    dispatch(addAttendance(attendanceData));

    alert("Attendance Updated Successfully");
    
    // Reset form
    setForm({ subjectName: "", totalClasses: "", presentClasses: "" });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-green-700">Update Attendance</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SUBJECT DROPDOWN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            name="subjectName"
            value={form.subjectName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ FIXED: Numeric input for Total Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Classes</label>
          <input
            type="number"
            name="totalClasses"
            value={form.totalClasses}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="0"
            required
          />
        </div>

        {/* ✅ FIXED: Numeric input for Present Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Present Classes</label>
          <input
            type="number"
            name="presentClasses"
            value={form.presentClasses}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;