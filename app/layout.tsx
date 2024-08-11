"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Portfolio | Dominik Meister</title>
                <meta
                    name="description"
                    content="My personal portfolio website"
                />
                <meta
                    name="keywords"
                    content="Dominik Meister, dominikmeister, portfolio, developer, software engineer, full stack, frontend, backend, web, website, app, application, programming, coding, development, design, ux, ui, user experience, user interface, react, next.js, typescript, javascript, python, java, html5, css3, node.js, express, amazonaws, postgresql, vercel, docker, git, github, gitlab, visualstudiocode, mysql"
                />
            </head>
            <body className={inter.className}>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
