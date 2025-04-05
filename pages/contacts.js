import Nav from '../components/Nav';
export default function Contacts() {
  return (
    <>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-semibold">Contact Directory</h1>
        <p>Manager: Jane Doe – jane@example.com</p>
        <p>Strata Admin: strata@example.com</p>
      </main>
    </>
  );
}
