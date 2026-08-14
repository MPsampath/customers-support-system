import Comment from "./Comment";
import StatusBadge from "./StatusBadge";

export default function TicketDetailCard({ ticket }) {
    return (
        <div className="bg-gray-100 shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">
                    {ticket.reference_number}
                </h2>
                <span className="text-sm text-gray-500">
                    <StatusBadge status={ticket.status} />
                </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
                <h3 className="text-base md:text-lg font-medium bg-gray-100 sm:bg-gray-200 p-3 sm:px-4 md:px-6 rounded-md text-center">
                    {ticket.customer_name}
                </h3>
                <h3 className="text-base md:text-lg font-medium bg-gray-100 sm:bg-gray-200 p-3 sm:px-4 md:px-6 rounded-md text-center break-all">
                    {ticket.customer_email}
                </h3>
                <h3 className="text-base md:text-lg font-medium bg-gray-100 sm:bg-gray-200 p-3 sm:px-4 md:px-6 rounded-md text-center">
                    {ticket.customer_phone}
                </h3>
            </div>

            <p className="text-gray-700 mb-4 mt-4">{ticket.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    {new Date(ticket.created_at).toLocaleString()}
                </span>
            </div>

            <Comment comments={ticket.comments} />
        </div>
    );
}
