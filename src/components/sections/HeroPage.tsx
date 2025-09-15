import React, { useEffect, useState, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStats } from "@/context/DataCacheContext";

const HeroPage = memo(() => {
  const router = useRouter();
  
  // Use cached stats data instead of local state
  const { stats, isLoading: statsLoading } = useStats();

  // Memoized hero features to prevent recreation
  const heroFeatures = useMemo(() => [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Roadmaps",
      desc: "Expert-crafted learning paths",
      gradient: "from-blue-400 to-blue-600",
      link: "/explore"
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75-7.478a12.06 12.06 0 00-4.5 0m8.25 2.25h.008v.008H21V13.5h-.75" />
        </svg>
      ),
      title: "AI Interview",
      desc: "Practice with AI mock interviews",
      gradient: "from-blue-500 to-blue-700",
      link: "/interview"
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659" />
        </svg>
      ),
      title: "Compensation",
      desc: "Salary insights & company data",
      gradient: "from-blue-600 to-blue-800",
      link: "/placement-data"
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
        </svg>
      ),
      title: "Blogs",
      desc: "Technical blogs & portfolio",
      gradient: "from-blue-300 to-blue-500",
      link: "/blogs"
    },
  ], []);

  // Memoized format function
  const formatNumber = useMemo(() => (num: number): string => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}k+`;
    }
    return `${num}+`;
  }, []);

  return (
    <section className="w-full h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Enhanced Background Effects - matching main page style */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.12),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.08),transparent_70%)]"></div>
      
      {/* Animated Grid Pattern - matching main page */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center py-8 mt-16 md:mt-32">
        
        {/* Main Hero Content */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            {/* Trust Badge - Hidden on mobile */}
            <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-sm text-zinc-300 mb-4 sm:mb-6 hover:bg-white/15 transition-all duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Trusted by {statsLoading ? "..." : formatNumber(stats?.activeUsers || 1000)} developers</span>
            </div>
            
            {/* Main Heading - Centered and responsive */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-300 mb-4 sm:mb-6 leading-[0.85] tracking-tight text-center">
              Your Complete
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                Dev Platform
              </span>
            </h1>
            
            {/* Subtitle - Centered and more concise on mobile */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 font-medium max-w-2xl md:max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 text-center">
              <span className="md:hidden">AI-powered interviews, roadmaps, and career guidance for developers</span>
              <span className="hidden md:inline">From structured learning paths to AI-powered interview prep—everything you need to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-semibold"> accelerate your tech career</span></span>
            </p>
            
            {/* CTA Buttons - Simplified animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/explore")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-200 text-lg flex items-center justify-center gap-3 hover:from-blue-500 hover:to-blue-700"
              >
                Start Your Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/about")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-200 text-lg flex items-center justify-center gap-3 hover:from-purple-500 hover:to-purple-700"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
});

HeroPage.displayName = 'HeroPage';

export { HeroPage };
