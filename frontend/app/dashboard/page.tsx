"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
    const { token } = useAuth();
    const [claims, setClaims] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        api
            .get("/claims/me", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setClaims(res.data))
            .catch(() => console.log("Failed to fetch claims"))
            .finally(() => setLoading(false));
    }, [token]);

    if (!token)
        return <div className="p-8 text-center text-gray-600">Login to view your dashboard</div>;

    if (loading)
        return <div className="p-8 text-center text-gray-500">Loading your claimed deals...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                My Claimed Deals
            </h1>

            {claims.length === 0 ? (
                <p className="text-gray-500 text-center text-lg mt-8">
                    You haven’t claimed any deals yet.
                </p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {claims.map((c) => (
                        <motion.div
                            key={c._id}
                            whileHover={{ scale: 1.05, y: -3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{c.deal.title}</h2>
                                <p className="text-gray-500 mb-2">Partner: {c.deal.partnerName}</p>
                                <p
                                    className={`font-semibold ${c.status === "approved"
                                            ? "text-green-600"
                                            : c.status === "pending"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                        }`}
                                >
                                    Status: {c.status}
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow-sm transition-all"
                            >
                                View Deal
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
