"use client";

import { useState, useEffect, useRef } from "react";
import Canvas from "./BackgroundCanvas";

export default function Home() {
    const [data, setData] = useState("Loading...");

    const URL =
        "https://personal-website-nodejs-serverless-function-express.vercel.app/api";

    async function getHello() {
        const response = await fetch(`${URL}/hello`);

        if (!response.ok) {
            throw new Error("An error occured while fetching");
        }

        const data = await response.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        console.log("getHello called");
        getHello()
            .then((data) => setData(data.message))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <div className="glow-container">
                <div className="ball"></div>
                <div
                    className="ball"
                    style={{
                        "--delay": "-80s",
                        "--size": "0.4",
                        "--speed": "160s",
                    }}
                ></div>
                <div
                    className="ball"
                    style={{
                        "--delay": "-40s",
                        "--size": "0.3",
                        "--speed": "80s",
                    }}
                ></div>
            </div>
            <main className="flex min-h-screen flex-col items-center p-6 justify-between">
                <div className="flex flex-col items-center justify-center flex-grow">
                    <div className="relative flex items-center justify-center">
                        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                            <h1 className="text-4xl">Dominik Meister</h1>
                        </div>
                    </div>
                </div>
                <div className="mb-8 text-center">
                    <p>Data: {data}</p>
                </div>
            </main>
        </>
    );
}
