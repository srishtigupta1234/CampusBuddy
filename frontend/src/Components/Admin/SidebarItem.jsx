import { NavLink } from "react-router-dom";
export const SidebarItem = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
          isActive
            ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100"
            : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};
