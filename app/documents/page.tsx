"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import ProtectedRoute from "../components/ProtectedRoute";
import Footer from "../components/Footer";

type Urls = {
    [key: string]: string;
};

export default function Documents() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [urls, setUrls] = useState<Urls>({});

    const URL = "https://api.dominikmeister.com/api";

    async function getDocument(name: string) {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await fetch(`${URL}/blobs/secure/${name}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUrls({ ...urls, [name]: data.url });
                } else {
                    console.error("Couldn't fetch for a document: ", res);
                    setError("Couldn't fetch for a document");
                }
            } catch (error) {
                console.error("No token found:", error);
                setError("No token found");
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getDocument("sample.pdf");
        getDocument("cv.pdf");
    }, []);

    return (
        <>
            <ProtectedRoute>
                <main className="flex flex-col items-center">
                    <NavBar activeSection={"documents"} />
                    <div className="flex flex-col items-center justify-center mt-36 mb-8">
                        <div className="relative flex items-center justify-center">
                            <div className="relative flex flex-col place-items-center before:-z-20 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                                <h1 className="text-4xl text-white">
                                    Documents
                                </h1>
                                {error && (
                                    <p className="text-red-600">{error}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 text-center">
                        <button onClick={() => console.log(urls)}>LOG</button>
                        <br />
                        <a href={urls["sample.pdf"]}>sample.pdf</a>
                        <a href={urls["cv.pdf"]}>sample.pdf</a>
                    </div>
                </main>
                <Footer />
            </ProtectedRoute>
        </>
    );
}
