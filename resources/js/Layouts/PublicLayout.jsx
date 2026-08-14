import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function PublicLayout({ children }) {
    return (
        <>
            <Disclosure
                as="nav"
                className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
            >
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon
                                    aria-hidden="true"
                                    className="block size-6 group-data-open:hidden"
                                />
                                <XMarkIcon
                                    aria-hidden="true"
                                    className="hidden size-6 group-data-open:block"
                                />
                            </DisclosureButton>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center text-white font-bold text-lg">
                                Customer Support Service
                            </div>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a
                                        key="Find Ticket"
                                        href={route("welcome")}
                                        aria-current="page"
                                        className="bg-gray-950/50 text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Find Ticket
                                    </a>

                                    <a
                                        key="Open Ticket"
                                        href={route("support-tickets.create")}
                                        aria-current="page"
                                        className="bg-gray-950/50 text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Open Ticket
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="hidden sm:ml-6 sm:block">
                                <a
                                    key="Login"
                                    href={route("agent.login")}
                                    aria-current="page"
                                    className="bg-gray-950/50 text-white rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a
                            key="Find Ticket"
                            href={route("welcome")}
                            aria-current="page"
                            className="bg-gray-950/50 text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Find Ticket
                        </a>

                        <a
                            key="Open Ticket"
                            href={route("support-tickets.create")}
                            aria-current="page"
                            className="bg-gray-950/50 text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Open Ticket
                        </a>

                        <a
                            key="Login"
                            href={route("agent.login")}
                            aria-current="page"
                            className="bg-gray-950/50 text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Login
                        </a>
                    </div>
                </DisclosurePanel>
            </Disclosure>

            <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                {children}
            </main>
        </>
    );
}
