import React from "react";

interface NavBarProps {
    activeSection: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection }) => {
    return (
        <nav className="flex justify-around p-4 m-4 backdrop-blur-md fixed top-0 z-10 border border-gray-600 rounded-full shadow-md max-w-screen-lg mx-auto mt-4">
            {/* Links Section */}
            <div className="items-center lg:flex ">
                <a
                    href="/#home"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "home"
                            ? "active"
                            : ""
                    }`}
                >
                    Home
                </a>

                <a
                    href="/#about"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "about"
                            ? "active"
                            : ""
                    }`}
                >
                    About
                </a>
                <a
                    href="/#projects"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "projects"
                            ? "active"
                            : ""
                    }`}
                >
                    Projects
                </a>
                <a
                    href="/#hobbies"
                    className={`flex cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "hobbies"
                            ? "active"
                            : ""
                    }`}
                >
                    Hobbies
                </a>
                <a
                    href="/#contact"
                    className={`flex text-white cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "contact"
                            ? "active"
                            : ""
                    }`}
                >
                    Contact
                </a>
                <a
                    href="/documents"
                    className={`flex text-white cursor-pointer transition-colors duration-300 mx-1 ${
                        activeSection === "documents"
                            ? "active"
                            : ""
                    }`}
                >
                    Documents
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
