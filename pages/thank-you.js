import Nav from '../components/Nav';

export default function ThankYou() {
  return (
    <>
      <Nav/>
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Thank You!</h1>
        <p>Your message has been received.</p>
      </main>
    </>
  );
}
