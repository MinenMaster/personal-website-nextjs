"use client";

import { useState, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import "./page.css";

const LoginContent = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <main className="flex flex-col items-center w-[100vw]">
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
                        placeholder="Username"
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
                        placeholder="Password"
                        id="password"
                    />
                    <button type="submit">Login</button>
                    <a className="aLogin" href="/">Back</a>
                </form>
                {error && <p className="text-red-600">{error}</p>}
            </main>
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
