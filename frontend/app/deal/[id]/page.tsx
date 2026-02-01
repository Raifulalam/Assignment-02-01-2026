"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";

interface Deal {
    _id: string;
    title: string;
    partnerName: string;
    description: string;
    category: string;
    discount: string;
    isLocked: boolean;
    eligibilityText: string;
}

export default function DealDetailsPage() {
    const { id } = useParams();
    const { token } = useAuth();
    const [deal, setDeal] = useState<Deal | null>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        api
            .get(`/deals/${id}`)
            .then((res) => setDeal(res.data))
            .catch(() => setMessage("Failed to fetch deal"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleClaim = async () => {
        if (!token) {
            setMessage("You must login to claim this deal");
            return;
        }

        setClaiming(true);
        try {
            const res = await api.post(
                `/claims/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(res.data.message);
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Failed to claim deal");
        } finally {
            setClaiming(false);
        }
    };

    if (loading)
        return <div className="p-8 text-center text-gray-500">Loading deal details...</div>;
    if (!deal)
        return <div className="p-8 text-center text-red-500">Deal not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
            >
                {/* Deal Info */}
                <h1 className="text-4xl font-bold mb-3 text-gray-800">{deal.title}</h1>
                <p className="text-gray-500 mb-4">Partner: {deal.partnerName}</p>
                <p className="text-gray-600 mb-4">{deal.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                    <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
                        Discount: {deal.discount}
                    </span>
                    <span className="bg-gray-100 text-gray-800 font-medium px-3 py-1 rounded-full">
                        Category: {deal.category}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mb-6">
                    Eligibility: {deal.eligibilityText}
                </p>

                {deal.isLocked && !token && (
                    <p className="text-red-500 font-bold mb-4">
                        Locked deal. Please login and get verified.
                    </p>
                )}

                {/* Claim Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClaim}
                    disabled={claiming || (deal.isLocked && !token)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all ${deal.isLocked && !token
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {claiming ? "Claiming..." : "Claim Deal"}
                </motion.button>

                {message && (
                    <p className={`mt-4 font-medium ${message.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
                        {message}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
