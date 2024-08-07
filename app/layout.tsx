"use client";

import type { Metadata } from "next";
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
