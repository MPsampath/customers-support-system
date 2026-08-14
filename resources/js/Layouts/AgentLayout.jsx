import { Link } from '@inertiajs/react';
import api from '@/lib/api';
import { clearSession, getAgent } from '@/lib/auth';

export default function AgentLayout({ children }) {
    const agent = getAgent();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            // ignore - we're logging out client-side regardless
        }

        clearSession();
        window.location.href = route('agent.login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('agent.tickets.index')}
                        className="flex items-center gap-2"
                    >
                        <span className="font-semibold text-gray-800">
                            Agent Dashboard
                        </span>
                    </Link>
                    <div className="flex items-center gap-4 text-sm">
                        {agent && (
                            <span className="text-gray-600">
                                {agent.name}
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="rounded-md px-3 py-2 text-gray-600 hover:text-gray-900"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
