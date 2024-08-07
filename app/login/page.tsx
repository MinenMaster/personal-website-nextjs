"use client";

import { useState, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

const LoginContent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const URL = "https://api.dominikmeister.com/api";

    const searchParams = useSearchParams();
    const from = searchParams.get("from");

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const res = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            const data = await res.json();
            login(data.token);

            const redirectTo = from || "/";
            router.push(redirectTo);
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <>
            <form onSubmit={handleLogin} className="flex flex-col">
                <input
                    type="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                    }}
                    placeholder="Username"
                    className="w-40 bg-slate-600"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                    placeholder="Password"
                    className="w-40 bg-slate-600"
                />
                <button type="submit" className="w-40">
                    Login
                </button>
            </form>
            {error && <p className="text-red-600">{error}</p>}
        </>
    );
};

const Login = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
};

export default Login;
