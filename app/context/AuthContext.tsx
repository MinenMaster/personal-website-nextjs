"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../lib/config";

type AuthContextValue = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    login: () => {},
    logout: async () => {},
    loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                setIsAuthenticated(res.ok);
            } catch {
                setIsAuthenticated(false);
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await fetch(`${API_BASE_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
            // Ensure local auth state is cleared even if logout request fails.
        }

        setIsAuthenticated(false);
        router.push("/login");
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
