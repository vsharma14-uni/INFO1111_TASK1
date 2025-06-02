import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();

    const isActive = (path) => {
        return router.pathname === path ? 'bg-blue-700' : '';
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-xl font-bold">
                        Strata Management
                    </Link>
                    <div className="flex space-x-4">
                        <Link href="/" className={`px-3 py-2 rounded-md ${isActive('/')}`}>
                            Home
                        </Link>
                        <Link href="/contact" className={`px-3 py-2 rounded-md ${isActive('/contact')}`}>
                            Contact
                        </Link>
                        <Link href="/maintenance" className={`px-3 py-2 rounded-md ${isActive('/maintenance')}`}>
                            Maintenance
                        </Link>
                        <Link href="/profiles" className={`px-3 py-2 rounded-md ${isActive('/profiles')}`}>
                            Profiles
                        </Link>
                        <Link href="/announcements" className={`px-3 py-2 rounded-md ${isActive('/announcements')}`}>
                            Announcements
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
} 