"use client";

import { useState, useEffect } from "react";
import { list } from "@vercel/blob";
import NavBar from "../components/NavBar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Documents() {
    const URL = "https://api.dominikmeister.com/api";

    interface ResponseType {
        blobs: BlobType[];
    }

    interface BlobType {
        pathname: string;
        downloadUrl: string;
    }

    const [response, setResponse] = useState<ResponseType>({ blobs: [] });

    async function getBlobs() {
        const response = await list();
        console.log("response: " + response);
        return response;
    }

    useEffect(() => {
        getBlobs()
            .then((data) => setResponse(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <ProtectedRoute>
                <main className="flex flex-col items-center">
                    <div className="flex min-h-screen flex-col items-center justify-between">
                        <NavBar activeSection={"documents"} />
                        <div className="flex flex-col items-center justify-center flex-grow">
                            <div className="relative flex items-center justify-center">
                                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                                    <h1 className="text-4xl text-white">
                                        Documents
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8 text-center">
                            <p>Data: ...</p>
                            {response.blobs ? (
                                response.blobs.map((blob) => (
                                    <a
                                        key={blob.pathname}
                                        href={blob.downloadUrl}
                                    >
                                        {blob.pathname}
                                    </a>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </main>
            </ProtectedRoute>
        </>
    );
}
