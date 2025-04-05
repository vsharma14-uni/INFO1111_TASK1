import Nav from '../components/Nav';

export default function Committee({ members }) {
  return (
    <>
      <Nav/>
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Strata Committee</h1>
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m,i) => (
              <tr key={i} className={i%2 ? 'bg-gray-50' : ''}>
                <td className="border px-4 py-2">{m.role}</td>
                <td className="border px-4 py-2">{m.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/committee`);
  const members = await res.json();
  return { props: { members } };
}
