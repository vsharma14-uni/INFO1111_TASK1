import Nav from '../components/Nav';
export default function Minutes() {
  return (
    <>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-semibold">Meeting Minutes</h1>
        <ul className="list-disc ml-5">
          <li>2025‑03‑15: Discussed new lift maintenance.</li>
          <li>2025‑02‑10: Approved budget for painting.</li>
        </ul>
      </main>
    </>
  );
}
