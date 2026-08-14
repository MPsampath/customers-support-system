import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AgentLayout from "@/Layouts/AgentLayout";
import api from "@/lib/api";
import { getToken } from "@/lib/auth";

const statusLabels = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
};

export default function Index() {
    const [tickets, setTickets] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!getToken()) {
            window.location.href = route("agent.login");
        }
    }, []);

    useEffect(() => {
        let active = true;
        setLoading(true);

        const timeout = setTimeout(() => {
            api.get("/agent/tickets", { params: { search, page } })
                .then((response) => {
                    if (active) {
                        setTickets(response.data);
                    }
                })
                .finally(() => active && setLoading(false));
        }, 300);

        return () => {
            active = false;
            clearTimeout(timeout);
        };
    }, [search, page]);

    return (
        <AgentLayout>
            <Head title="Support Tickets" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="flex items-center justify-between p-6">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Support Tickets
                    </h1>
                    <input
                        placeholder="Search by customer name..."
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                        className="w-64"
                    />
                </div>
                <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                    Reference
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                    Received
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {loading && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            )}

                            {!loading && tickets?.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No tickets found.
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                tickets?.data.map((ticket) => {
                                    const isNew = ticket.status === "open";

                                    return (
                                        <tr
                                            key={ticket.id}
                                            className={
                                                isNew
                                                    ? "bg-yellow-50 font-semibold"
                                                    : ""
                                            }
                                        >
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                <Link
                                                    href={route(
                                                        "agent.tickets.show",
                                                        ticket.reference_number,
                                                    )}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    {ticket.reference_number}
                                                </Link>
                                                {isNew && (
                                                    <span className="ml-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs text-yellow-900">
                                                        New
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                {ticket.customer_name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                {statusLabels[ticket.status] ??
                                                    ticket.status}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                {new Date(
                                                    ticket.created_at,
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

                {tickets && tickets.last_page > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {tickets.current_page} of {tickets.last_page}
                        </span>
                        <button
                            disabled={page >= tickets.last_page}
                            onClick={() => setPage((p) => p + 1)}
                            className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </AgentLayout>
    );
}
