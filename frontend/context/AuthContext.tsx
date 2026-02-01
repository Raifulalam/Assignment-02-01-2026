"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (t: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);

    // Load token from localStorage on client side
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setTokenState(savedToken);
    }, []);

    // Update localStorage whenever token changes
    const setToken = (t: string | null) => {
        if (t) localStorage.setItem("token", t);
        else localStorage.removeItem("token");
        setTokenState(t);
    };

    return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
