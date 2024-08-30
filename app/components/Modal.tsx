import React, { ReactNode, useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    function close() {
        setIsVisible(false);
        setTimeout(() => onClose(), 200);
    }

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`fixed w-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`bg-gray-900 bg-opacity-30 backdrop-blur-md p-6 border border-gray-600 rounded-2xl shadow-lg max-w-3xl w-full mx-4 relative transform transition-transform duration-200 ${
                    isVisible ? "scale-100" : "scale-95"
                }`}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition text-3xl font-bold p-2"
                    onClick={close}
                >
                    &times;
                </button>
                <div className="flex flex-col justify-center p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
