import Nav from '../components/Nav';

export default function Levies({ levies }) {
  return (
    <>
      <Nav/>
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Upcoming Levies</h1>
        <ul className="list-disc ml-5 space-y-2">
          {levies.map((l,i) => (
            <li key={i}>
              <strong>{l.fund}</strong> – ${l.amount} due {l.due}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/levies`);
  const levies = await res.json();
  return { props: { levies } };
}
