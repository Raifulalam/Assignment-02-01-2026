"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
    const { token, setToken } = useAuth();

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <header className="shadow p-4 sticky top-0 z-50 bg-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">StartupBenefits</Link>
                <nav className="flex items-center gap-4">
                    <motion.a whileHover={{ scale: 1.05 }} href="/deal" className="text-gray-700 hover:text-blue-600">Deals</motion.a>
                    {token ? (
                        <>
                            <motion.a whileHover={{ scale: 1.05 }} href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</motion.a>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                onClick={handleLogout}
                            >
                                Logout
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <motion.a whileHover={{ scale: 1.05 }} href="/login" className="text-gray-700 hover:text-blue-600">Login</motion.a>
                            <motion.a whileHover={{ scale: 1.05 }} href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Register</motion.a>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
