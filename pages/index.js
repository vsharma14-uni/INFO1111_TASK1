import Layout from '../components/Layout';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <h2>Welcome to Strata Management</h2>
      {/* Next.js Image Component */}
      <Image
        src="/images/landing.jpg"  // path relative to the public folder
        alt="Beautiful view of our strata-managed building"
        width={600}                // adjust based on your design
        height={400}               // adjust based on your design
        priority                   // optional: loads the image with higher priority
      />
      <p>This is our beautifully styled Strata Management website.</p>
    </Layout>
  );
}
