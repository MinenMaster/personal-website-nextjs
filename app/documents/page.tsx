"use client";

import { useState, useEffect } from "react";
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
    }

    const allDocuments = [
        {
            name: "cv.pdf",
            title: "Curriculum Vitae",
            description:
                "My personal CV with professional and academic details.",
        },
        {
            name: "zeugniss-gibb.pdf",
            title: "School Report - gibb",
            description: "My grades from the gibb.",
        },
        {
            name: "zeugniss-bwd.pdf",
            title: "School Report - BWD",
            description: "My grades from the BWD.",
        },
        {
            name: "KNW106.pdf",
            title: "Module Report - m106",
            description: "My grade report for the module 106.",
        },
        {
            name: "KNW187.pdf",
            title: "Module Report - m187",
            description: "My grade report for the module 187.",
        },
        {
            name: "KNW210.pdf",
            title: "Module Report - m210",
            description: "My grade report for the module 210.",
        },
        {
            name: "KNW294.pdf",
            title: "Module Report - m294",
            description: "My grade report for the module 294.",
        },
        {
            name: "KNW295.pdf",
            title: "Module Report - m295",
            description: "My grade report for the module 295.",
        },
        {
            name: "KNW335.pdf",
            title: "Module Report - m335",
            description: "My grade report for the module 335.",
        },
        {
            name: "abacus-finanzbuchhaltung.pdf",
            title: "Abacus Certificate Financial Accounting",
            description:
                "My certificate for the Abacus Financial Accounting course.",
        },
        {
            name: "abacus-debitorenbuchhaltung.pdf",
            title: "Abacus Certificate Accounts Receivable",
            description:
                "My certificate for the Abacus Accounts Receivable course.",
        },
        {
            name: "abacus-kreditorenbuchhaltung.pdf",
            title: "Abacus Certificate Accounts Payable",
            description:
                "My certificate for the Abacus Accounts Payable course.",
        },
    ];

    async function downloadAllDocuments() {
        const zip = new JSZip();

        for (const doc of allDocuments) {
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
            for (const doc of allDocuments) {
                await getDocument(doc.name);
            }
        };

        // or

        // const getAllDocuments = async () => {
        //     const promises = allDocuments.map((doc) => getDocument(doc.name));
        //     await Promise.all(promises);
        // };

        getAllDocuments();

        setLoading(false);
    }, []);

    return (
        <>
            <ProtectedRoute>
                <head>
                    <title>Documents | Dominik Meister</title>
                </head>
                <main className="flex flex-col items-center">
                    <NavBar activeSection={"documents"} />
                    <div className="flex flex-col items-center justify-center mt-36 mb-8">
                        <div className="relative flex items-center justify-center">
                            <div className="relative flex flex-col place-items-center text-center before:-z-10 after:-z-10 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
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
                        {loading && <div className="loader"></div>}
                        {allDocuments.map((doc) => (
                            <a
                                href={urls[doc.name]}
                                target="_blank"
                                key={doc.name}
                            >
                                <div className="flex flex-col p-4 m-4 border border-gray-600 rounded-2xl max-w-screen-lg mt-4">
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
