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
                <p className="text-white mb-4">
                    This website and its content are licensed under the MIT
                    License. All rights reserved. Please ensure to adhere to the
                    terms of the license for any reuse or distribution.
                </p>
                <h3 className="text-2xl mb-3 text-white">License:</h3>
                <p>
                    MIT License
                    <br />
                    <br />
                    Copyright (c) 2024 Dominik Meister
                    <br />
                    <br />
                    Permission is hereby granted, free of charge, to any person
                    obtaining a copy of this software and associated
                    documentation files (the "Software"), to deal in the
                    Software without restriction, including without limitation
                    the rights to use, copy, modify, merge, publish, distribute,
                    sublicense, and/or sell copies of the Software, and to
                    permit persons to whom the Software is furnished to do so,
                    subject to the following conditions:
                    <br />
                    <br />
                    The above copyright notice and this permission notice shall
                    be included in all copies or substantial portions of the
                    Software.
                    <br />
                    <br />
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                    KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                    WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
                    OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
            </Modal>
        </footer>
    );
};

export default Footer;
