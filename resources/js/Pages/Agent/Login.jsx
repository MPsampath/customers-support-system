import { Head } from "@inertiajs/react";
import PublicLayout from "../../Layouts/PublicLayout";
import React, { useState } from "react";
import api from "@/lib/api";
import { setSession } from "@/lib/auth";

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);

        try {
            const response = await api.post("/auth/login", data);
            setSession(response.data.access_token, response.data.user);
            window.location.href = route("agent.tickets.index");
        } catch (err) {
            setError(err.response?.data?.message ?? "Unable to log in.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <PublicLayout>
            <div className="mt-6 w-full overflow-hidden bg-white px-4 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <Head title="Agent Login" />

                <h1 className="mb-4 text-lg font-semibold text-gray-900">
                    Support Agent Login
                </h1>

                <form onSubmit={submit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            className="mt-1 block w-full"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            className="mt-1 block w-full"
                            required
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Log in
                        </button>
                    </div>
                    {error && (
                        <div className="mt-4 text-red-500">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </PublicLayout>
    );
}
