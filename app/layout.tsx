import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Portfolio &verbar; Dominik Meister",
    description: "My personal portfolio website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                {children}
            </body>
        </html>
    );
}
