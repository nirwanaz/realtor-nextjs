"use client";

import { useAuth } from "@/context";
import { RegisterProps } from "@/interfaces";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FormRegisters = [
    {
        name: "fullname",
        type: "text",
        label: "Full Name",
        autoComplete: "current-name",
    },
    {
        name: "email",
        type: "email",
        label: "Email Address",
        autoComplete: "email",
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        autoComplete: "current-password",
    },
];

const registerState = {
    fullname: '',
    email: '',
    password: '',
}

const Register = () => {
    const [register, setRegister] = useState<RegisterProps>(registerState);

    const { error, registerUser, clearErrors } = useAuth();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors()
        }
    }, [error])

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(register);
        registerUser(register);
    }

    return (
        <main className="min-h-screen flex items-center">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-3xl text-center font-black leading-12 text-indigo-600">
                        Realtor
                    </h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-50">
                        Register your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={submitHandler}>
                        {FormRegisters.map((input) => (
                            <div key={input.name}>
                                <label
                                    htmlFor={input.name}
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                                >
                                    {input.label}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id={input.name}
                                        name={input.name}
                                        type={input.type}
                                        autoComplete={input.autoComplete}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={register?.[input.name]}
                                        onChange={(e) => setRegister({...register, [input.name]: e.target.value})}
                                    />
                                </div>
                            </div>
                        ))}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Have a account?{" "}
                        <Link
                            href="/auth/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            SignIn here
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Register;
