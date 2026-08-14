import { useState } from "react";
import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import api from "@/lib/api";
import TicketDetailCard from "@/Components/TicketDetailCard";
import InputError from "@/Components/InputError";
import Loading from "@/Components/Loading";

const statusLabels = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
};

export default function Welcome() {
    const [referenceNumber, setReferenceNumber] = useState("");
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);
        setTicket(null);

        try {
            
            if (!referenceNumber) {
                setError("Please enter a reference number.");
                return;
            }

            const response = await api.get(`/ticket/${referenceNumber}`);
            setTicket(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message ??
                    "Something went wrong. Please try again.",
            );
        } finally {
            setProcessing(false);
        }
    };

    return (
        <PublicLayout>
            <Head title="Check Ticket Status" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 sm:p-8">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Check Ticket Status
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Enter the reference number you received when opening
                        your ticket.
                    </p>
                        <div className="flex-1">
                            <label
                                htmlFor="reference_number"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Reference Number
                            </label>

                            <input
                                type="text"
                                name="reference_number"
                                id="reference_number"
                                value={referenceNumber}
                                onChange={(e) =>
                                    setReferenceNumber(e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />

                            <button
                                type="submit"
                                onClick={submit}
                                disabled={processing}
                                className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? "Checking..." : "Check Status"}
                            </button>

                            {error && (
                                <p className="mt-2 text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>
                </div>
            </div>

            {ticket && (
                <TicketDetailCard ticket={ticket} />
            )}

        </PublicLayout>
    );
}
