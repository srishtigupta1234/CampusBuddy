import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";

const slides = [
  {
    image: s1,
    title: "Empowering Your Academic Journey",
    subtitle:
      "Unlock your potential with intelligent tools and curated resources designed for modern students."
  },
  {
    image: s2,
    title: "Everything in One Central Hub",
    subtitle:
      "Access study materials, track performance, and manage academics seamlessly in one place."
  },
  {
    image: s3,
    title: "Collaborate and Grow Together",
    subtitle:
      "Connect, learn, and succeed with a community built for excellence."
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-slate-900">
      
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ transition: "opacity 1.5s ease, transform 10s linear" }}
        >
          <img
            src={slide.image}
            alt="Campus"
            className="w-full h-full object-cover"
          />

          {/* Elegant overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6 lg:px-8">
        <div className="max-w-2xl space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            Trusted Academic Platform
          </div>

          {/* Headings */}
          <div className="space-y-5">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Campus{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                Buddy
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 leading-snug">
              {slides[current].title}
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed">
              {slides[current].subtitle}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/resources">
              <button className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-emerald-900/30 flex items-center gap-2">
                Explore Resources
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link to="/about">
              <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-3.5 rounded-xl font-semibold transition-all">
                Learn More
              </button>
            </Link>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 pt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-10 bg-emerald-500"
                    : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[40px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.39,110.19,126.68,115.96,193.2,111.39,243,107.93,284.63,82.02,321.39,56.44Z"
            className="fill-slate-50"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;