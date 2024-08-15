"use client";

import { useState } from "react";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const res = await fetch(
                "https://api.dominikmeister.com/api/email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        message,
                    }),
                }
            );

            if (res.ok) {
                setSuccessMessage("Your message has been sent!");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                console.log(res);
                setErrorMessage(
                    "There was an error sending your message. Please try again."
                );
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
                <label htmlFor="name" className="block mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="block mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                />
            </div>
            <div>
                <label htmlFor="message" className="block mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-600"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Enter your message"
                    required
                />
            </div>
            <button
                type="submit"
                className="text-white w-full md:w-auto transform transition-transform duration-300 hover:scale-[1.01] px-4 py-2 rounded-full"
                style={{
                    background:
                        "linear-gradient(259.53deg, #1d4ed8 8.53%, #f55f0a 96.34%)",
                }}
            >
                Send
            </button>
            {successMessage && (
                <p className="text-green-500 mt-4">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
        </form>
    );
};

export default ContactForm;
