"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ProtectedRoute from "../components/ProtectedRoute";
import Footer from "../components/Footer";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudArrowDown,
    faFilePdf,
    faBriefcase,
    faGraduationCap,
    faBook,
    faAward,
} from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../lib/config";

type Urls = {
    [key: string]: string;
};

const documentCategories = [
    {
        category: "Professional",
        icon: faBriefcase,
        docs: [
            {
                name: "cv.pdf",
                title: "Curriculum Vitae",
                description: "My professional CV with experience, education, and skills.",
            },
        ],
    },
    {
        category: "School Reports",
        icon: faGraduationCap,
        docs: [
            {
                name: "zeugniss-gibb.pdf",
                title: "School Report - gibb",
                description: "Final report from gibb vocational school.",
            },
            {
                name: "zeugniss-bwd.pdf",
                title: "School Report - BWD",
                description: "Final report from BWD vocational school.",
            },
        ],
    },
    {
        category: "Module Certifications",
        icon: faBook,
        docs: [
            {
                name: "KNW106.pdf",
                title: "Module 106",
                description: "Query, edit, and maintain databases.",
            },
            {
                name: "KNW187.pdf",
                title: "Module 187",
                description: "Set up and operate an ICT workstation with an operating system.",
            },
            {
                name: "KNW210.pdf",
                title: "Module 210",
                description: "Use public cloud services for applications.",
            },
            {
                name: "KNW294.pdf",
                title: "Module 294",
                description: "Build the frontend of an interactive web application.",
            },
            {
                name: "KNW295.pdf",
                title: "Module 295",
                description: "Build the backend for applications.",
            },
            {
                name: "KNW335.pdf",
                title: "Module 335",
                description: "Build a mobile application.",
            },
        ],
    },
    {
        category: "Professional Certifications",
        icon: faAward,
        docs: [
            {
                name: "abacus-finanzbuchhaltung.pdf",
                title: "Abacus Financial Accounting",
                description: "ABACUS Financial Accounting user certification.",
            },
            {
                name: "abacus-debitorenbuchhaltung.pdf",
                title: "Abacus Accounts Receivable",
                description: "ABACUS Accounts Receivable user certification.",
            },
            {
                name: "abacus-kreditorenbuchhaltung.pdf",
                title: "Abacus Accounts Payable",
                description: "ABACUS Accounts Payable user certification.",
            },
        ],
    },
];

const allDocuments = documentCategories.flatMap((cat) => cat.docs);

export default function Documents() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [urls, setUrls] = useState<Urls>({});
    const [downloadingAll, setDownloadingAll] = useState(false);

    async function getDocument(name: string) {
        try {
            const res = await fetch(`${API_BASE_URL}/blobs/secure/${name}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUrls((prevUrls) => ({
                    ...prevUrls,
                    [name]: data.url,
                }));
            } else {
                setError("Couldn't fetch one or more documents");
            }
        } catch {
            setError("Failed to load documents");
        }
    }

    async function downloadAllDocuments() {
        setDownloadingAll(true);
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
        setDownloadingAll(false);
    }

    useEffect(() => {
        document.title = "Documents | Dominik Meister";

        const getAllDocuments = async () => {
            try {
                const promises = allDocuments.map((doc) => getDocument(doc.name));
                await Promise.all(promises);
            } finally {
                setLoading(false);
            }
        };

        getAllDocuments();
    }, []);

    return (
        <>
            <div className="glow-container">
                <div className="ball"></div>
                <div
                    className="ball"
                    style={
                        {
                            "--delay": "-80s",
                            "--size": "0.4",
                            "--speed": "160s",
                        } as React.CSSProperties
                    }
                ></div>
                <div
                    className="ball"
                    style={
                        {
                            "--delay": "-40s",
                            "--size": "0.3",
                            "--speed": "80s",
                        } as React.CSSProperties
                    }
                ></div>
            </div>

            <ProtectedRoute>
                <main className="flex flex-col items-center overflow-hidden">
                    <NavBar activeSection={"documents"} />

                    <div className="flex flex-col items-center justify-center w-full pt-20 pb-10 px-4">
                        <div className="relative flex items-center justify-center w-full">
                            <div className="relative flex flex-col place-items-center text-center before:-z-10 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Documents</h1>
                                <p className="text-gray-300 text-lg max-w-2xl">
                                    A collection of my certifications, reports, and professional credentials
                                </p>
                                {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-5xl px-4 pb-20">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-12 flex justify-center">
                                    <button
                                        onClick={downloadAllDocuments}
                                        disabled={downloadingAll}
                                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50"
                                    >
                                        <FontAwesomeIcon icon={faCloudArrowDown} className="text-xl" />
                                        {downloadingAll ? "Downloading..." : "Download All Documents"}
                                    </button>
                                </div>

                                <div className="space-y-16">
                                    {documentCategories.map((categoryObj) => (
                                        <div key={categoryObj.category} className="animate-fadeIn">
                                            <div className="flex items-center gap-3 mb-6">
                                                <FontAwesomeIcon
                                                    icon={categoryObj.icon}
                                                    className="text-2xl text-blue-400"
                                                />
                                                <h2 className="text-3xl font-bold text-white">
                                                    {categoryObj.category}
                                                </h2>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {categoryObj.docs.map((doc, index) => (
                                                    <a
                                                        key={doc.name}
                                                        href={urls[doc.name]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group"
                                                    >
                                                        <div
                                                            className="relative h-full p-6 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                                                            style={{
                                                                animationDelay: `${index * 0.05}s`,
                                                            }}
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
                                                                    <FontAwesomeIcon
                                                                        icon={faFilePdf}
                                                                        className="text-red-400 text-xl"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                                                                        {doc.title}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2">
                                                                        {doc.description}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 pointer-events-none transition-all duration-300"></div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </main>
                <Footer />
            </ProtectedRoute>
        </>
    );
}
