"use client";

import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const URL = "https://api.dominikmeister.com/api";

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
            localStorage.setItem("token", data.token);
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
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-40 bg-slate-600"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-40 bg-slate-600"
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="text-red-600">{error}</p>}
        </>
    );
}
