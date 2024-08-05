"use client";

import { useState, useEffect } from "react";

export default function Home() {
    const [data, setData] = useState("Loading...");
    const [activeSection, setActiveSection] = useState("");

    const URL =
        "https://personal-website-nodejs-serverless-function-express.vercel.app/api";

    async function getHello() {
        const response = await fetch(`${URL}/hello`);

        if (!response.ok) {
            throw new Error("An error occured while fetching");
        }

        const data = await response.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        console.log("getHello called");
        getHello()
            .then((data) => setData(data.message))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 60) {
                    currentSection = section.getAttribute("id");
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
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

            <main className="flex flex-col items-center">
                <div className="flex min-h-screen flex-col items-center justify-between">
                    <span id="home"></span>
                    <nav className="flex justify-around p-4 m-4 backdrop-blur-md fixed top-0 z-10 border border-gray-600 rounded-full shadow-md max-w-screen-lg mx-auto mt-4">
                        {/* Links Section */}
                        <div className="items-center lg:flex ">
                            <a
                                href="#home"
                                className={`flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300 mx-1 ${
                                    activeSection === "home"
                                        ? "text-blue-500 font-bold"
                                        : ""
                                }`}
                            >
                                Home
                            </a>

                            <a
                                href="#about"
                                className={`flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300 mx-1 ${
                                    activeSection === "about"
                                        ? "text-blue-500 font-bold"
                                        : ""
                                }`}
                            >
                                About
                            </a>
                            <a
                                href="#projects"
                                className={`flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300 mx-1 ${
                                    activeSection === "projects"
                                        ? "text-blue-500 font-bold"
                                        : ""
                                }`}
                            >
                                Projects
                            </a>
                            <a
                                href="#hobbies"
                                className={`flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300 mx-1 ${
                                    activeSection === "hobbies"
                                        ? "text-blue-500 font-bold"
                                        : ""
                                }`}
                            >
                                Hobbies
                            </a>
                            <a
                                href="#contact"
                                className={`flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300 mx-1 ${
                                    activeSection === "contact"
                                        ? "text-blue-500 font-bold"
                                        : ""
                                }`}
                            >
                                Contact
                            </a>
                            <a className="flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300 mx-1">
                                Documents
                            </a>
                        </div>
                    </nav>

                    <div className="flex flex-col items-center justify-center flex-grow">
                        <div className="relative flex items-center justify-center">
                            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                                <h1 className="text-4xl text-white">
                                    Greetings! I&apos;m Dominik Meister
                                </h1>
                            </div>
                        </div>
                    </div>
                    <a href="#about">
                        <div className="scroll-down"></div>
                    </a>
                </div>
                <span id="about"></span>
                <section className="about-me flex flex-col justify-center p-6 z-[1]">
                    <h2 className="text-3xl mb-4">about me.</h2>
                    <p className="max-w-5xl">
                        Hello! I am Dominik, a passionate developer with a love
                        for creating innovative solutions. I enjoy working on
                        web development projects and learning new technologies.
                    </p>
                </section>
                <span id="projects"></span>
                <section className="about-me flex flex-col justify-center p-6 z-[1]">
                    <h2 className="text-3xl mb-4">Projects</h2>
                    <p className="max-w-5xl">
                        Hello! I am Dominik, a passionate developer with a love
                        for creating innovative solutions. I enjoy working on
                        web development projects and learning new technologies.
                    </p>
                </section>
                <span id="hobbies"></span>
                <section className="about-me flex flex-col justify-center p-6 z-[1]">
                    <h2 className="text-3xl mb-4">Hobbies</h2>
                    <p className="max-w-5xl">
                        Hello! I am Dominik, a passionate developer with a love
                        for creating innovative solutions. I enjoy working on
                        web development projects and learning new technologies.
                    </p>
                </section>
                <span id="contact"></span>
                <section className="about-me flex flex-col justify-center p-6 z-[1]">
                    <h2 className="text-3xl mb-4">Contact</h2>
                    <p className="max-w-5xl">
                        Hello! I am Dominik, a passionate developer with a love
                        for creating innovative solutions. I enjoy working on
                        web development projects and learning new technologies.
                    </p>
                </section>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p>Data: {data}</p>
            </main>
        </>
    );
}
