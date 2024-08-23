"use client";

import { useState, useEffect, Key } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";

export default function Home() {
    const [activeSection, setActiveSection] = useState("home");

    const URL = "https://api.dominikmeister.com/api";

    // const devicons = [
    //     "typescript-plain colored",
    //     "javascript-plain colored",
    //     "python-plain colored",
    //     "java-plain colored",
    //     "cplusplus-plain colored",
    //     "csharp-plain colored",
    //     "react-original colored",
    //     "html5-plain colored",
    //     "css3-plain colored",
    //     "nodejs-plain colored",
    //     "express-original",
    //     "nextjs-plain",
    //     "amazonwebservices-plain-wordmark",
    //     "postgresql-plain colored",
    //     "mysql-original colored",
    //     "vercel-original",
    //     "docker-plain colored",
    //     "git-plain colored",
    //     "github-original",
    //     "gitlab-plain colored",
    //     "vscode-plain colored",
    // ];

    const programmingLanguages = [
        { skill: "TypeScript", icon: "typescript-plain colored" },
        { skill: "JavaScript", icon: "javascript-plain colored" },
        { skill: "Python", icon: "python-plain colored" },
        { skill: "Java", icon: "java-plain colored" },
        { skill: "C#", icon: "csharp-plain colored" },
    ];

    const frontendBackendTechnologies = [
        { skill: "React", icon: "react-original colored" },
        { skill: "Next.js", icon: "nextjs-plain" },
        { skill: "HTML5", icon: "html5-plain colored" },
        { skill: "CSS3", icon: "css3-plain colored" },
        { skill: "Node.js", icon: "nodejs-plain colored" },
        { skill: "Express", icon: "express-original" },
        { skill: "PostgreSQL", icon: "postgresql-plain colored" },
        { skill: "MySQL", icon: "mysql-original colored" },
    ];

    const misc = [
        { skill: "Vercel", icon: "vercel-original" },
        { skill: "Docker", icon: "docker-plain colored" },
        { skill: "Kubernetes", icon: "kubernetes-plain colored" },
        { skill: "Git", icon: "git-plain colored" },
        { skill: "GitHub", icon: "github-original" },
        { skill: "GitLab", icon: "gitlab-plain colored" },
        { skill: "VSCode", icon: "vscode-plain colored" },
    ];

    const DeviconList = ({ listName }: { listName: any[] }) => {
        return (
            <div className="flex space-x-4">
                {listName.map((item: any, index: Key | null | undefined) => (
                    <div key={index} className="relative group">
                        <i
                            key={index}
                            className={`devicon-${item.icon} text-4xl`}
                        ></i>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded-md p-1">
                            {item.skill}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("span");
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 500) {
                    const sectionId = section.getAttribute("id");
                    if (sectionId) {
                        currentSection = sectionId;
                    }
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
                    <NavBar activeSection={activeSection} />
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <div className="relative flex flex-col lg:flex-row items-center justify-center max-w-4xl">
                            <img
                                src="portrait.jpg"
                                className="w-96 rounded-xl m-4"
                            />
                            <div className="relative flex place-items-center text-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                                <h1 className="text-5xl text-white">
                                    Welcome! My name is Dominik Meister.
                                </h1>
                            </div>
                        </div>
                    </div>
                    <a href="#about">
                        <div className="scroll-down"></div>
                    </a>
                </div>
                <span id="about"></span>
                <section className="flex flex-col justify-center p-6 z-[1] border border-gray-600 rounded-2xl md:max-w-4xl lg:w-full mx-4">
                    <div className="flex-col">
                        <h2 className="text-3xl mb-4">about me.</h2>
                        <p>
                            Hi, my name is Dominik, I&apos;m 17 years old, and I
                            live in Kehrsatz. My dad is an IT specialist and a
                            passionate tinkerer, and he tried to pass on his
                            love for technology to me at a young age. I first
                            started programming through Minecraft, where I
                            created simple mods and scripts. Later, I got more
                            into Python and began learning about web
                            development.
                        </p>
                        <p>
                            I enjoy taking on complex challenges with computers.
                            I like working on problems until I find the best
                            solution. At school, I&apos;m known for being
                            helpful. Even if I don&apos;t know the perfect
                            answer yet, I&apos;m always ready to help others
                            with their tasks. I come from a big family where
                            there&apos;s always something going on, and I often
                            get to solve technical issues, whether it&apos;s for
                            friends or family.
                        </p>
                        <h3 className="text-xl mb-4">
                            some technologies i use:
                        </h3>
                        <p>Programming Languages:</p>
                        <DeviconList listName={programmingLanguages} />
                        <p>Frontend & Backend Technologies:</p>
                        <DeviconList listName={frontendBackendTechnologies} />
                        <p>Miscellaneous:</p>
                        <DeviconList listName={misc} />
                    </div>
                </section>
                <span id="projects"></span>
                <section className="flex flex-col justify-center p-6 z-[1] border border-gray-600 rounded-2xl md:max-w-4xl lg:w-full mx-4">
                    <h2 className="text-3xl mb-4">
                        projects i&apos;ve worked on.
                    </h2>
                    <p>
                        Here are some of the most interesting projects I&apos;ve
                        worked on at school or home. Click the buttons to view
                        the abstract or the GitHub repository.
                    </p>
                    <Projects />
                </section>
                <span id="contact"></span>
                <section className="flex flex-col justify-center p-6 z-[1] border border-gray-600 rounded-2xl md:max-w-4xl lg:w-full mx-4">
                    <h2 className="text-3xl mb-4">let&apos;s connect.</h2>
                    <p>
                        Feel free to get in touch using the form below or
                        sending an email to{" "}
                        <u>
                            <a href="mailto:dominik.s.meister@proton.me">
                                dominik.s.meister@proton.me
                            </a>
                        </u>
                        .
                    </p>
                    <ContactForm />
                </section>
                {/* <section>
                    Who am I I&apos;m currently in my second year of apprenticeship
                    as a computer scientist. My passion for technology drives me
                    to continually learn and develop my skills. When something
                    interests me, I&apos;m highly capable of learning quickly and
                    thoroughly. My goal is to specialize in IT security in the
                    future, where I can leverage my skills and knowledge to
                    protect and secure digital information. I&apos;m eager to
                    continue growing as a developer and to contribute to
                    projects that challenge and inspire me. Hobbies In my free
                    time, I enjoy staying active and engaged in various
                    activities. Volleyball is one of my favorite sports, and I
                    love playing it both competitively and casually with
                    friends. I also make it a point to regularly go to the gym,
                    as it helps me maintain my physical fitness and overall
                    well-being. These hobbies not only provide a great balance
                    to my professional life but also keep me motivated and
                    energized
                </section> */}
            </main>
            <Footer />
        </>
    );
}
