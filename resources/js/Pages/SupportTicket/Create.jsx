import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useState } from "react";
import Modal from "@/Components/Modal";

export default function Create() {
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        description: "",
    });
    const [referenceNumber, setReferenceNumber] = useState("");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            // Make an API call to create the support ticket
            const response = await fetch("/api/ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to create support ticket");
            }

            const result = await response.json();
            setReferenceNumber(result.data.reference_number);
            setOpen(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <PublicLayout>
            <Head title="Create Support Ticket" />

            <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                <div className="p-6 sm:p-8">
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Create Support Ticket
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Please fill out the form below to create a new
                            support ticket.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div className="mb-6">
                            <label
                                htmlFor="customer_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                name="customer_name"
                                id="customer_name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={data.customer_name}
                                onChange={handleChange}
                                required
                            />
                            
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="customer_email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                name="customer_email"
                                id="customer_email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={data.customer_email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="customer_phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="customer_phone"
                                id="customer_phone"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={data.customer_phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>

                            <textarea
                                name="description"
                                id="description"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={data.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* //Success Modal */}
            <Modal show={open} onClose={() => setOpen(false)} maxWidth="sm" closeable={false}>
                <div className="text-center bg-white p-5 rounded-lg shadow-lg">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-blue-700/10">
                        <svg
                            className="h-4 w-4 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Success
                    </span>

                    <p className="mb-4">
                        Ticket Reference Number
                        <br />
                        <span className="font-bold text-lg">
                            {referenceNumber}
                        </span>
                    </p>
                    <button
                        onClick={() => {
                            setOpen(false);
                            window.location.href = "/"; 
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* Error Modal */}
            <Modal show={!!error} onClose={() => setError(null)} maxWidth="sm" closeable={false}>
                <div className="text-center bg-white p-5 rounded-lg shadow-lg">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                        <svg
                            className="h-4 w-4 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        Error
                    </span>

                    <p className="mb-4">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>

        </PublicLayout>
    );
}
