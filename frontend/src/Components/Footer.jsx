import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cblogo3.png";
import {
  EnvelopeIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white to-emerald-50 border-t border-emerald-100 pt-24 pb-12 overflow-hidden">
      
      {/* Soft Emerald Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Brand Section */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Campus Buddy Logo"
                className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Campus <span className="text-emerald-600">Buddy</span>
              </h2>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              A unified academic workspace for students. Track attendance,
              monitor performance, and manage academic insights with clarity.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <SocialIcon
                href="https://www.linkedin.com/in/srishti-gupta-ab6092323"
                label="LinkedIn"
                icon={<FaLinkedinIn className="w-5 h-5" />}
              />
              <SocialIcon
                href="https://github.com/srishtigupta1234"
                label="GitHub"
                icon={<FaGithub className="w-5 h-5" />}
              />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Academic Tools */}
          <FooterColumn
            title="Academic Tools"
            links={[
              { to: "/resources", text: "Study Materials" },
              { to: "/cgpa-calculator", text: "CGPA Calculator" },
              { to: "/tracker", text: "Attendance Tracker" },
              { to: "/scholarship", text: "Scholarships" },
            ]}
          />

          {/* Community */}
          <FooterColumn
            title="Community"
            links={[
              { to: "/societies", text: "Campus Societies" },
              { to: "/about", text: "About the Project" },
              { to: "/privacy", text: "Privacy Policy" },
              { to: "/contact", text: "Support Center" },
            ]}
          />

          {/* Contact Section */}
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Contact
            </h3>

            <div className="space-y-6 text-sm text-slate-600">

              <div className="flex gap-4 items-start group">
                <div className="p-3 rounded-xl bg-white shadow-sm border border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <a
                  href="mailto:srishtigupta97527@gmail.com"
                  className="font-medium text-emerald-600 hover:underline"
                >
                  support@campusbuddy.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-slate-500">
            © {currentYear} Campus Buddy. All rights reserved.
          </p>

          <div className="flex gap-8">
            <Link
              to="/terms"
              className="text-slate-500 hover:text-emerald-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/cookies"
              className="text-slate-500 hover:text-emerald-600 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

/* Footer Column */
const FooterColumn = ({ title, links }) => (
  <div className="md:col-span-4 lg:col-span-2">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-8">
      {title}
    </h3>
    <ul className="space-y-4">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.to}
            className="text-sm text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1 group"
          >
            {link.text}
            <ArrowTopRightOnSquareIcon className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* Social Icon */
const SocialIcon = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-emerald-100 text-slate-500 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 active:scale-95"
  >
    {icon}
  </a>
);

export default Footer;