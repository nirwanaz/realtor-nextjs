"use client";

import { RegisterProps, UserAttributes } from "@/interfaces";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

interface AuthContextProps {
    user?: UserAttributes;
    error?: string;
    setUser: (user: UserAttributes) => void;
    registerUser: (userData: RegisterProps) => void;
    clearErrors: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserAttributes | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const router = useRouter();

    const registerUser = async({ fullname, email, password }: RegisterProps) => {
        try {
            const { data } = await axios.post(`${process.env.API_URL}/api/auth/register`, { fullname, email, password });

            if (data?.user) {
                router.push("/auth/login")
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>

            if (axiosError.response) {
                setError(axiosError.response.data.message);

            } else {
                setError("An Error occured during registration.");
            }
        }
    }

    const clearErrors = () => {
        setError(undefined);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                setUser,
                registerUser,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
