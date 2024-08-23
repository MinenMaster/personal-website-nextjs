"use client";

import React, { useState, useEffect } from "react";

type Urls = {
    [key: string]: string;
};

interface Project {
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    abstract: string;
    githubUrl: string;
}

const ProjectBox = ({ project, urls }: { project: Project; urls: Urls }) => (
    <div
        className="projectBox"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
    >
        <div className="projectInfo">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
                {project.tags.map((tag: string) => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>
            <a
                href={urls[project.abstract]}
                target="_blank"
                rel="noopener noreferrer"
                className="abstractButton"
            >
                View Abstract
            </a>
            <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="abstractButton"
            >
                View GitHub
            </a>
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
                await getAbstract(project.abstract);
            }
        };

        // or

        // const getAllAbstracts = async () => {
        //     const promises = projects.map((project) => getAbstract(project.abstract));
        //     await Promise.all(promises);
        // };

        getAllAbstracts();
    }, []);

    const projects = [
        {
            title: "Project One",
            description: "This is a brief description of Project One.",
            tags: ["React", "Node.js", "CSS"],
            imageUrl: "/projects/TowerDefense.png",
            abstract: "IMS_Projekt-Abstract_TowerDefense.pdf",
            githubUrl: "https://github.com/MinenMaster/TowerDefense",
        },
        {
            title: "Project Two",
            description: "This is a brief description of Project Two.",
            tags: ["Vue.js", "Firebase", "Sass"],
            imageUrl: "/projects/HomeAide-Help.png",
            abstract: "IMS_Projekt-Abstract_HomeAide.pdf",
            githubUrl: "https://github.com/MinenMaster/HomeAide",
        },
        {
            title: "Project Two",
            description: "This is a brief description of Project Two.",
            tags: ["Vue.js", "Firebase", "Sass"],
            imageUrl: "/projects/TowerDefense.png",
            abstract: "IMS_Projekt-Abstract_TowerDefense.pdf",
            githubUrl: "https://github.com/MinenMaster/TowerDefense",
        },
        {
            title: "Project One",
            description: "This is a brief description of Project One.",
            tags: ["React", "Node.js", "CSS"],
            imageUrl: "/projects/TowerDefense.png",
            abstract: "IMS_Projekt-Abstract_TowerDefense.pdf",
            githubUrl: "https://github.com/MinenMaster/TowerDefense",
        },
        {
            title: "Project Two",
            description: "This is a brief description of Project Two.",
            tags: ["Vue.js", "Firebase", "Sass"],
            imageUrl: "/projects/TowerDefense.png",
            abstract: "IMS_Projekt-Abstract_TowerDefense.pdf",
            githubUrl: "https://github.com/MinenMaster/TowerDefense",
        },
        {
            title: "Project Two",
            description: "This is a brief description of Project Two.",
            tags: ["Vue.js", "Firebase", "Sass"],
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
