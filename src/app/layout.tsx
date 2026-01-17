import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import font
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { createClient } from '@/utils/supabase/server';

// Configure font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Institute Management SaaS",
    description: "The complete solution for schools and coaching institutes.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar user={user} />
                <main style={{ minHeight: 'calc(100vh - 400px)' }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
