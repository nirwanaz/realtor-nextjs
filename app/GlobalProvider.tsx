"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastContainer position="bottom-right" />
            <AuthProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </AuthProvider>
        </>
    )
}