"use client";

import { useState, Suspense, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import "./page.css";

const LoginContent = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const URL = "https://api.dominikmeister.com/api";

    const searchParams = useSearchParams();
    const from = searchParams.get("from");

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        setLoading(true);

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
            setError("Invalid credentials");
        }

        setLoading(false);
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <main className="flex flex-col items-center w-screen h-screen">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter your username"
                        id="username"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter your password"
                        id="password"
                    />
                    {error && <p className="text-red-600">{error}</p>}
                    <button className="buttonLogin" type="submit">
                        Login
                    </button>
                    <a className="aLogin" href="/">
                        Back
                    </a>
                </form>
                {loading && (
                    <div className="loaderBackground">
                        <div className="loader"></div>
                    </div>
                )}
            </main>
        </>
    );
};

const Login = () => {
    return (
        <Suspense
            fallback={
                <div className="loaderBackground">
                    <div className="loader"></div>
                </div>
            }
        >
            <LoginContent />
        </Suspense>
    );
};

export default Login;
