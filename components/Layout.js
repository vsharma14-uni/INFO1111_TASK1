import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <h1>Strata Management</h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/form">Submit a Request</Link></li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <main>{children}</main>
      </div>

      <footer>
        <p>&copy; 2023 Strata Management. All rights reserved.</p>
      </footer>
    </>
  );
}
