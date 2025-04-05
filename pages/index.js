import Head from 'next/head';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <>
      <Head>
        <title>Strata Management Dashboard</title>
        <meta name="description" content="Welcome to our minimal Strata site!" />
      </Head>

      <Nav />

      <main className="p-8">
        <h1 className="text-4xl font-bold mb-4">Strata Management Dashboard</h1>
        <p className="mb-6">A basic site with no environment variables or fetch calls.</p>

        <ul className="list-disc ml-5 space-y-2">
          <li>View Levies</li>
          <li>Check Committee</li>
          <li>Look up Funds</li>
          <li>Submit Requests</li>
          <li>Contact us for any info</li>
        </ul>
      </main>
    </>
  );
}
