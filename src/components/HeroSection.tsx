/** @format */

import React, { useEffect, useState } from "react";
import { Brain, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [offset, setOffset] = useState(0);

  // Parallax Effect: Update Offset on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.2); // Adjust multiplier for subtle effect
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restrict the offset range to prevent excessive movement
  const clampedOffset = Math.min(Math.max(offset, -20), 20);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section (Text + Button) */}
          <div className="md:w-1/2 mb-10 md:mb-0 relative">
            {/* Background Parallax Effect */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-300 opacity-50 blur-xl"
              style={{
                transform: `translateY(${clampedOffset}px)`,
                willChange: "transform",
                pointerEvents: "none",
                zIndex: 0,
              }}
            ></div>

            {/* Content Wrapper */}
            <div
              className="relative z-10"
              style={{
                transform: `translateY(${clampedOffset}px)`,
                willChange: "transform",
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                <span className="block text-blue-600">AI-Copilot</span>
                <span className="block">for Physicians</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                Revolutionizing healthcare documentation with advanced
                speech-to-text technology designed specifically for medical
                professionals.
              </p>

              {/* Button with Restricted Parallax Motion */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const element = document.getElementById("features");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  style={{
                    transform: `translateY(${clampedOffset / 3}px)`, // Moves less than text
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  Explore Features
                </button>
              </div>
            </div>
          </div>

          {/* Right Section (Image + Effect) */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Doctor using AI technology"
                  className="rounded-lg shadow-2xl relative z-10 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-6 z-20">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Brain className="h-10 w-10 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        AI-Powered
                      </h3>
                      <p className="text-sm text-gray-500">
                        Advanced medical transcription
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
