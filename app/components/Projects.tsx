"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

type Urls = {
    [key: string]: string;
};

interface Project {
    title: string;
    description: string;
    link?: { icon: any; url: string };
    icons: (string | { skill: string; icon: string })[];
    imageUrl: string;
    abstract?: string;
    githubUrl?: string;
}

const ProjectBox = ({ project, urls }: { project: Project; urls: Urls }) => (
    <div
        className="projectBox"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
    >
        <div className="projectInfo">
            {(project.link && (
                <h3 className="text-xl">
                    <a href={project.link.url} target="_blank">
                        {project.title}{" "}
                        <FontAwesomeIcon icon={project.link.icon} />
                    </a>
                </h3>
            )) || <h3 className="text-xl">{project.title}</h3>}
            <p>{project.description}</p>
            <div className="icons">
                {project.icons.map((item: any) => (
                    <div key={item.skill} className="relative group mr-1">
                        <i
                            key={item.skill}
                            className={`devicon-${item.icon} text-3xl`}
                        ></i>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded-md p-1">
                            {item.skill}
                        </div>
                    </div>
                ))}
            </div>

            <div className="buttonBox">
                {project.abstract && (
                    <a
                        href={urls[project.abstract]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="abstractButton"
                    >
                        View Abstract
                    </a>
                )}

                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="abstractButton"
                    >
                        View on GitHub
                    </a>
                )}
            </div>
        </div>
    </div>
);

function Projects() {
    const [urls, setUrls] = useState<Urls>({});

    const URL = "https://api.dominikmeister.com/api";

    async function getAbstract(abstract: string) {
        const res = await fetch(`${URL}/blobs/public/${abstract}`);

        if (res.ok) {
            const data = await res.json();
            setUrls((prevUrls) => ({
                ...prevUrls,
                [abstract]: data.url,
            }));
        } else {
            console.error("Couldn't fetch for an abstract: ", res);
        }
    }

    useEffect(() => {
        const getAllAbstracts = async () => {
            for (const project of projects) {
                if (project.abstract) {
                    await getAbstract(project.abstract);
                }
            }
        };

        // or

        // const getAllAbstracts = async () => {
        //     const promises = projects
        //         .filter((project) => project.abstract)
        //         .map((project) => getAbstract(project.abstract));
        //     await Promise.all(promises);
        // };

        getAllAbstracts();
    }, []);

    const projects = [
        {
            title: "HomeAide",
            description:
                "A .NET MAUI application for managing home automations.",
            icons: [
                { skill: ".NET", icon: "dot-net-plain colored" },
                { skill: "C#", icon: "csharp-plain colored" },
            ],
            imageUrl: "/projects/HomeAide-Help.png",
            abstract: "IMS_Projekt-Abstract_HomeAide.pdf",
            githubUrl: "https://github.com/MinenMaster/HomeAide",
        },
        {
            title: "Personal Website",
            description: "My first personal website.",
            icons: [
                { skill: "HTML5", icon: "html5-plain colored" },
                { skill: "CSS3", icon: "css3-plain colored" },
                { skill: "JavaScript", icon: "javascript-plain colored" },
            ],
            imageUrl: "/projects/PersonalWebsite.png",
            abstract: "IMS_Projekt-Abstract_PersonalWebsite.pdf",
        },
        {
            title: "NovaClient",
            description: "A simple utility mod / client for Minecraft.",
            icons: [{ skill: "Java", icon: "java-plain colored" }],
            imageUrl: "/projects/novaclient.webp",
            // abstract: "AAA",
            githubUrl: "https://github.com/MinenMaster/NovaClient",
        },
        {
            title: "MusicCollection",
            description: "A music library app made with React Native.",
            icons: [
                { skill: "React Native", icon: "react-original colored" },
                { skill: "Node.js", icon: "nodejs-plain colored" },
                {
                    skill: "Android Studio",
                    icon: "androidstudio-plain colored",
                },
            ],
            imageUrl: "/projects/MusicCollection.webp",
            abstract: "IMS_Projekt-Abstract_MusicCollection.pdf",
            githubUrl: "https://github.com/MinenMaster/MusicCollection",
        },
        {
            title: "BulletHell",
            link: {
                icon: faLink,
                url: "https://bullethell.dominikmeister.com",
            },
            description: "A simple bullet hell game made with HTML5.",
            icons: [
                { skill: "HTML5", icon: "html5-plain colored" },
                { skill: "CSS3", icon: "css3-plain colored" },
                { skill: "JavaScript", icon: "javascript-plain colored" },
            ],
            imageUrl: "/projects/BulletHell.png",
            // abstract: "AAA",
            githubUrl: "https://github.com/MinenMaster/HTML5-BulletHell",
        },
        {
            title: "TowerDefense",
            description: "A 3D tower defense game made with Unity.",
            icons: [{ skill: "C#", icon: "csharp-plain colored" }],
            imageUrl: "/projects/TowerDefense.png",
            abstract: "IMS_Projekt-Abstract_TowerDefense.pdf",
            githubUrl: "https://github.com/MinenMaster/TowerDefense",
        },
    ];

    return (
        <div className="projectsPage">
            {projects.map((project, index) => (
                <ProjectBox key={index} project={project} urls={urls} />
            ))}
        </div>
    );
}

export default Projects;
