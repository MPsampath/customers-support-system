export default function StatusBadge({ status }) {
    let colorClass = '';
    let statusText = '';
    switch (status) {
        case 'open':
            colorClass = 'inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30';
            statusText = 'Open';
            break;
        case 'closed':
            colorClass = 'inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20';
            statusText = 'Closed';
            break;
        case 'in_progress':
            colorClass = 'inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20';
            statusText = 'In Progress';
            break;
        default:
            colorClass = 'bg-gray-100 text-gray-800';
            statusText = 'Unknown';
    }

    return (
        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${colorClass}`}>
            {status}
        </span>
    );
}