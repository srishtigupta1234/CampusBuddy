import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register, login } from "../State/Auth/Action";
import {
  XMarkIcon,
  AcademicCapIcon,
  UserIcon,
  LockClosedIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/cblogo3.png";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth?.user) {
      onClose();
    }
  }, [auth?.user, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (isLogin) {
      const userCredentials = {
        username: data.get("username"),
        password: data.get("password"),
      };

      dispatch(login(userCredentials));
    } else {
      // SIGNUP: Send username, password, and role
      const newUser = {
        username: data.get("username"),
        password: data.get("password"),
        role: data.get("role"),
      };

      dispatch(register(newUser));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl shadow-indigo-900/20 relative overflow-hidden transform transition-all">
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 via-blue-500 to-emerald-400 opacity-10 pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors z-10"
        >
          <XMarkIcon className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className="p-8 pt-10">
          {/* Header & Logo */}
          <div className="text-center mb-8 relative z-10">
            <div className="mx-auto w-32 h-32 flex items-center justify-center">
              <img
                src={logo}
                alt="Campus Buddy Logo"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campus Buddy
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 font-medium">
              Your academic journey, simplified.
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-xl mb-8 relative z-10">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                isLogin
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                !isLogin
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="e.g. srishti_g"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Role Dropdown - SIGNUP ONLY */}
            {!isLogin && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">
                  Select Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IdentificationIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="role"
                    defaultValue=""
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none font-medium cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Choose your role...
                    </option>
                    <option value="USER">Student</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                  </select>
                </div>
              </div>
            )}

            {auth?.error && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-600 text-sm animate-in fade-in zoom-in duration-200">
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{auth.error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-indigo-500/30 active:scale-[0.98] mt-4"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
