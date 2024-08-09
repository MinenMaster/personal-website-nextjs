"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({
    isAuthenticated: false,
    login: (token: string) => {},
    logout: () => {},
    loading: true,
});

import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const URL = "https://api.dominikmeister.com/api";

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await fetch(`${URL}/auth`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (res.ok) {
                        setIsAuthenticated(true);
                    } else {
                        console.log("res: ", res);
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Error verifying token:", error);
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
