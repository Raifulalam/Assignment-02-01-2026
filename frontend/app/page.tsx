"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-r from-blue-100 to-blue-50 relative">

      {/* Optional floating background shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-30 animate-pulse -z-10"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-300 rounded-full opacity-20 animate-pulse -z-10"></div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-6xl font-extrabold text-blue-600 mb-6 leading-tight"
      >
        Startup Benefits Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg sm:text-xl text-gray-800 mb-8 max-w-2xl"
      >
        Get exclusive SaaS deals for startups, indie hackers, and early-stage teams. Unlock productivity tools, analytics platforms, and more – tailored for your growth.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
      >
        <Link href="/deal" className="font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
          Explore Deals
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-sm text-gray-600 mt-6"
      >
        No credit card required. Join for free and start claiming deals today.
      </motion.p>
    </div>
  );
}
