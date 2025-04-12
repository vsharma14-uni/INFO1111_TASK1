import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Strata Management</h1>
      <p>Welcome to the Strata Management Website!</p>
      <nav>
        <ul>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/form">Submit a Request</Link></li>
        </ul>
      </nav>
    </div>
  );
}
