import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/maintenance', label: 'Maintenance' },
        { href: '/contact', label: 'Contact' },
        { href: '/about', label: 'About' }
    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800">
                                Strata Management
                            </Link>
                        </div>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex sm:items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="ml-8 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
} 