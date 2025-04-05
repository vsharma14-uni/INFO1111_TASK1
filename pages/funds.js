import Nav from '../components/Nav';

export default function Funds() {
  return (
    <>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Fund Balances</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded shadow">
            <h2 className="font-semibold">Administration Fund</h2>
            <p className="text-xl">$12,500</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h2 className="font-semibold">Capital Works Fund</h2>
            <p className="text-xl">$8,750</p>
          </div>
        </div>
      </main>
    </>
  );
}
