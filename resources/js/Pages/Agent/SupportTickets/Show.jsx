import React from "react";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import api from "@/lib/api";
import AgentLayout from "@/Layouts/AgentLayout";
import { Head } from "@inertiajs/react";
import TicketDetailCard from "@/Components/TicketDetailCard";

export default function Show({ ticketId }) {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState("");

    const fetchTicket = async () => {
        try {
            const response = await api.get(`/agent/tickets/${ticketId}`);
            console.log("Fetched ticket:", response.data);
            setTicket(response.data);
        } catch (error) {
            console.error("Error fetching ticket:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!getToken()) {
            window.location.href = route("agent.login");
        }

        fetchTicket();
    }, [ticketId]);

    const submitReply = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/agent/tickets/${ticketId}/comments`, {
                comment,
                status,
            });
            setComment("");
            setStatus("");
            fetchTicket(); // Refresh ticket details after submitting a reply
        } catch (error) {
            console.error("Error submitting reply:", error);
            setError(error);
        }
    };

    return (
        <AgentLayout>
            <Head title={`Support Ticket #${ticketId}`} />

            <button
                className="bg-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4"
                onClick={() => window.location.href = route("agent.tickets.index")}
            >
                &larr; Back to Tickets
            </button>

            {loading ? (
                <p>Loading ticket details...</p>
            ) : error ? (
                <p>Error loading ticket: {error.message}</p>
            ) : (
                <>
                    <TicketDetailCard ticket={ticket} />

                    <form
                        onSubmit={submitReply}
                        className="mt-6 space-y-4 border-t border-gray-200 pt-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Reply
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                            
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" disabled={loading} className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                                Send Reply
                            </button>
                        </div>
                    </form>
                </>
            )}
        </AgentLayout>
    );
}
