import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

interface NavBarProps {
    activeSection: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection }) => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="flex justify-around p-4 m-4 backdrop-blur-md fixed top-0 z-10 border border-gray-600 rounded-full shadow-md max-w-screen-lg mx-auto mt-4">
            <div className="items-center lg:flex ">
                <a
                    href="/#home"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "home" ? "active" : ""
                    }`}
                >
                    Home
                </a>

                <a
                    href="/#about"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "about" ? "active" : ""
                    }`}
                >
                    About
                </a>
                <a
                    href="/#projects"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "projects" ? "active" : ""
                    }`}
                >
                    Projects
                </a>
                <a
                    href="/#hobbies"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "hobbies" ? "active" : ""
                    }`}
                >
                    Hobbies
                </a>
                <a
                    href="/#contact"
                    className={`flex text-white cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "contact" ? "active" : ""
                    }`}
                >
                    Contact
                </a>
                <a
                    href="/documents"
                    className={`flex text-white cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "documents" ? "active" : ""
                    }`}
                >
                    {isAuthenticated ? (
                        <FontAwesomeIcon
                            icon={faLockOpen}
                            className="my-auto mr-1"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faLock}
                            className="my-auto mr-1"
                        />
                    )}
                    Documents
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
