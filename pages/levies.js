import Nav from '../components/Nav';

export default function Levies() {
  // Hard-coded data
  const levies = [
    { fund: 'Administration Fund', amount: 200, due: '2025-05-01' },
    { fund: 'Capital Works Fund',  amount: 150, due: '2025-05-01' },
  ];

  return (
    <>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Upcoming Levies</h1>
        <ul className="list-disc ml-5 space-y-2">
          {levies.map((l, i) => (
            <li key={i}>
              <strong>{l.fund}</strong> – ${l.amount} due {l.due}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
