import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Modal from "./Modal";

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <footer className="flex flex-row mx-auto max-w-screen-lg">
            <div className="flex p-4 m-4 mr-2 md:mt-20 backdrop-blur-md bottom-0 z-10 border border-gray-600 rounded-full shadow-md">
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
            </div>
            <div className="flex p-4 m-4 ml-2 md:mt-20 backdrop-blur-md bottom-0 z-10 border border-gray-600 rounded-full shadow-md items-center justify-center">
                <a
                    className="link flex cursor-pointer transition-colors duration-300 mx-1"
                    onClick={openModal}
                >
                    Legal
                </a>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-3xl mb-4 text-white">Legal Notice</h2>
                <p className="text-white">
                    This website and its content are licensed under the MIT
                    License. All rights reserved. Please ensure to adhere to the
                    terms of the license for any reuse or distribution.
                </p>
                <p className="text-white mt-4">
                    For more details, you can view the full license{" "}
                    <a
                        href="https://github.com/MinenMaster/personal-website-nextjs/blob/main/LICENSE.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        here
                    </a>
                    .
                </p>
            </Modal>
        </footer>
    );
};

export default Footer;
