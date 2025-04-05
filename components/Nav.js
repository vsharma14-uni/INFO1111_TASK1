import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/levies">Levies</Link></li>
        <li><Link href="/committee">Committee</Link></li>
        <li><Link href="/funds">Funds</Link></li>
        <li><Link href="/requests">Requests</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
