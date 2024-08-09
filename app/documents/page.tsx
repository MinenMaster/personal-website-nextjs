"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import ProtectedRoute from "../components/ProtectedRoute";
import Footer from "../components/Footer";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

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
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log(res);
                    setUrls((prevUrls) => ({
                        ...prevUrls,
                        [name]: data.url,
                    }));
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

    const documents = [
        {
            name: "sample.pdf",
            title: "Sample Document",
            description: "This is a sample document for testing purposes.",
        },
        {
            name: "cv.pdf",
            title: "Curriculum Vitae",
            description:
                "My personal CV with professional and academic details.",
        },
    ];

    async function downloadAllDocuments() {
        const zip = new JSZip();

        for (const doc of documents) {
            const url = urls[doc.name];
            if (url) {
                const response = await fetch(url);
                const blob = await response.blob();
                zip.file(doc.name, blob);
            }
        }

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "Dominik_Meister-Documents.zip");
    }

    useEffect(() => {
        const getAllDocuments = async () => {
            for (const doc of documents) {
                await getDocument(doc.name);
            }
        };

        // or

        // const getAllDocuments = async () => {
        //     const promises = documents.map((doc) => getDocument(doc.name));
        //     await Promise.all(promises);
        // };

        getAllDocuments();
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
                    <div className="mb-8 text-center flex-col">
                        <button
                            onClick={downloadAllDocuments}
                            className="downloadButton"
                        >
                            <FontAwesomeIcon
                                icon={faCloudArrowDown}
                                size="xl"
                                className="cursor-pointer"
                            />{" "}
                            Download all documents as .zip
                        </button>
                        {documents.map((doc, index) => (
                            <a href={urls[doc.name]} key={doc.name}>
                                <div className="flex flex-col p-4 m-4 border border-gray-600 rounded-2xl max-w-screen-lg mx-auto mt-4">
                                    <h2 className="text-2xl font-semibold mb-2">
                                        {doc.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {doc.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </main>
                <Footer />
            </ProtectedRoute>
        </>
    );
}
