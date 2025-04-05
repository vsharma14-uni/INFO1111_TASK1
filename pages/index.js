import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <>
      <Head>
        <title>Strata Management Dashboard</title>
        <meta
          name="description"
          content="Owners Corporation portal for NSW strata buildings"
        />
      </Head>

      <Nav />

      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Strata Management Dashboard</h1>
        <p className="mb-6">
          Welcome to your Owners Corporation portal. Use the navigation above to
          view levies, committee members, fund balances, submit requests, or
          contact us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link
            href="/levies"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Upcoming Levies →</h2>
            <p>See the next due levies for administration and capital works.</p>
          </Link>

          <Link
            href="/committee"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Strata Committee →</h2>
            <p>View elected committee members and their roles.</p>
          </Link>

          <Link
            href="/funds"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Fund Balances →</h2>
            <p>Check current balances of administration and capital works funds.</p>
          </Link>

          <Link
            href="/requests"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Maintenance Requests →
            </h2>
            <p>Submit a new maintenance request for common-area issues.</p>
          </Link>

          <Link
            href="/contact"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Contact Us →</h2>
            <p>Send a message or inquiry to the Owners Corporation.</p>
          </Link>

        </div>
      </main>

      <footer className="text-center p-4 bg-gray-100">
        <p className="text-sm">
          © {new Date().getFullYear()} Strata Management Portal
        </p>
      </footer>
    </>
  );
}
