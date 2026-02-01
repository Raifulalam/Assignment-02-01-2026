"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const { setToken } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await api.post("/auth/login", { email, password });
            setToken(res.data.token);
            router.push("/deal");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h1>

                {message && (
                    <p
                        className={`mb-4 text-center font-medium ${message.includes("failed") ? "text-red-500" : "text-green-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>

                <p className="mt-6 text-sm text-gray-500 text-center">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-medium underline">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
