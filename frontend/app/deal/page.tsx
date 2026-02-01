"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { motion } from "framer-motion";
import Link from "next/link";

interface Deal {
    _id: string;
    title: string;
    partnerName: string;
    discount: string;
    category: string;
    isLocked: boolean;
}

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        api.get("/deals").then((res) => setDeals(res.data));
    }, []);

    const filteredDeals = deals.filter((deal) => {
        return (
            deal.title.toLowerCase().includes(search.toLowerCase()) &&
            (filter === "all" || (filter === "locked" ? deal.isLocked : !deal.isLocked))
        );
    });

    return (
        <div className="min-h-screen p-6 sm:p-8 bg-gray-50">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                Available Deals
            </h1>

            {/* Search & Filter */}
            <div className="flex flex-col text-gray-600 sm:flex-row items-center justify-between mb-8 gap-4 max-w-4xl mx-auto">
                <input
                    type="text"
                    placeholder="Search deals..."
                    className="border text-gray-600 border-gray-300 p-3 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="locked">Locked</option>
                    <option value="unlocked">Unlocked</option>
                </select>
            </div>

            {/* Deals Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredDeals.map((deal) => (
                    <motion.div
                        key={deal._id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`relative p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-300 bg-white ${deal.isLocked ? "opacity-60" : ""
                            }`}
                    >
                        {/* Locked Overlay */}
                        {deal.isLocked && (
                            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center text-white font-bold text-lg rounded-2xl z-10">
                                Locked
                            </div>
                        )}

                        {/* Deal Content */}
                        <div className="z-0">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                                {deal.title}
                            </h2>
                            <p className="text-gray-600 mb-2">{deal.partnerName}</p>
                            <p className="text-blue-600 font-semibold mb-4">{deal.discount}</p>
                            <p className="text-sm text-gray-400 mb-4">
                                Category: {deal.category}
                            </p>

                            <Link
                                href={`/deal/${deal._id}`}
                                className={`inline-block text-sm font-medium underline ${deal.isLocked ? "text-gray-300 pointer-events-none" : "text-blue-600 hover:text-blue-700"
                                    }`}
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
