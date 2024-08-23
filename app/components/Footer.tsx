import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="flex p-4 m-4 mt-20 backdrop-blur-md bottom-0 z-10 border border-gray-600 rounded-full shadow-md max-w-screen-lg mx-auto">
            <div className="flex items-center">
                <div className="relative group w-8 h-8 flex justify-center items-center">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/MinenMaster/personal-website-nextjs/blob/main/LICENSE.md"
                    >
                        <Image
                            src="/MIT_logo.svg"
                            alt="MIT License Logo"
                            width={32}
                            height={32}
                            className="cursor-pointer pointer-events-none"
                        />
                    </a>
                    <div className="text-center absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded-md p-1">
                        Copyright &copy; 2024 Dominik Meister
                        <br />
                        This website is licensed using the MIT License
                    </div>
                </div>
                <div className="relative group ml-[14px] mr-4 w-8 h-8 flex justify-center items-center">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/MinenMaster"
                    >
                        <FontAwesomeIcon
                            icon={faGithub}
                            className="text-2xl cursor-pointer"
                        />
                    </a>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded-md p-1">
                        View my GitHub Account
                    </div>
                </div>
                <div className="relative group flex justify-center items-center h-8">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/in/dominik-meister-1806382a3"
                    >
                        <FontAwesomeIcon
                            icon={faLinkedin}
                            className="text-2xl cursor-pointer"
                        />
                    </a>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded-md p-1">
                        View my LinkedIn Profile
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
