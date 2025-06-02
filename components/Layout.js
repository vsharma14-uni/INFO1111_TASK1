// components/Layout.js (example)
import Link from 'next/link';
import styles from '../styles/Layout.module.css';
import CookieConsent from './CookieConsent';

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <h1>Strata Harmony</h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/form">Submit a Request</Link></li>
            <li><Link href="/maintenance">Maintenance</Link></li>
            <li><Link href="/profiles">Profiles</Link></li>
            <li><Link href="/announcements">Announcements</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/events">Events</Link></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        &copy; 2024 Vanshh Sharma. All rights reserved.
      </footer>

      <CookieConsent />
    </div>
  );
}
