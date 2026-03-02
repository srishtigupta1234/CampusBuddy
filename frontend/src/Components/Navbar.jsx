import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  BookOpenIcon,
  InformationCircleIcon,
  CalculatorIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/cblogo3.png";
import { logout } from "../State/Auth/Action";

const navItems = [
  {
    name: "Dashboard",
    icon: Squares2X2Icon,
    href: "/dashboard",
    adminOnly: true,
  },
  {
    name: "Academics",
    icon: AcademicCapIcon,
    children: [
      { name: "Resources", href: "/resources", icon: BookOpenIcon },
      {
        name: "CGPA Calculator",
        href: "/cgpa-calculator",
        icon: CalculatorIcon,
      },
      { name: "Attendance", href: "/tracker", icon: UserGroupIcon },
    ],
  },
  {
    name: "Student Life",
    icon: UserGroupIcon,
    children: [
      { name: "Scholarships", href: "/scholarship", icon: AcademicCapIcon },
      { name: "Societies", href: "/societies", icon: CodeBracketIcon },
    ],
  },
  { name: "About", icon: InformationCircleIcon, href: "/about" },
];

const DesktopDropdown = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-600 hover:text-green-700 transition-all">
        <item.icon className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
        {item.name}
        <ChevronDownIcon className="w-3 h-3 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {item.children.map((child) => (
            <Link
              key={child.name}
              to={child.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 text-slate-600 hover:text-green-700 transition-colors"
            >
              <child.icon className="w-5 h-5 opacity-60" />
              <span className="text-sm font-bold">{child.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
const Navbar = ({ onOpenAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const role = auth?.user?.role?.toLowerCase();
  const isAdmin = role === "admin" || role === "role_admin";
  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin,
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              {/* Reduced logo size slightly to balance the layout */}
              <img
                src={logo}
                alt="Logo"
                className="relative w-20 h-20 object-contain"
              />
            </div>
            <span className="hidden sm:block text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-500 tracking-tighter">
              CAMPUS BUDDY
            </span>
          </Link>

          {/* Desktop Menu - FIXED LOGIC HERE */}
          <div className="hidden lg:flex items-center gap-2">
            {filteredNavItems.map((item) => {
              // If the item has children, render the Dropdown component
              if (item.children) {
                return <DesktopDropdown key={item.name} item={item} />;
              }

              // Otherwise, render a standard flat link
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 ${isActive ? "text-green-600" : "text-slate-400"}`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            {auth?.user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-50 border border-slate-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 text-white flex items-center justify-center font-black text-sm shadow-sm">
                    {auth.user.username?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDownIcon
                    className={`w-3 h-3 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                        Account
                      </p>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        @{auth.user.username}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
                      >
                        <UserCircleIcon className="w-5 h-5 opacity-60" />{" "}
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 opacity-60" />{" "}
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-slate-900 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg active:scale-95"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - Updated to show sub-items clearly */}
      <div
        className={`lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 invisible"} bg-white border-t overflow-y-auto`}
      >
        <div className="p-4 space-y-2">
          {filteredNavItems.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {item.name}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 p-4 text-slate-700 font-bold hover:bg-green-50 rounded-2xl transition-colors"
                    >
                      <child.icon className="w-6 h-6 text-slate-400" />{" "}
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 text-slate-700 font-bold hover:bg-green-50 rounded-2xl transition-colors"
                >
                  <item.icon className="w-6 h-6 text-slate-400" /> {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
