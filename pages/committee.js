import Nav from '../components/Nav';

export default function Committee() {
  // Hard-coded data
  const members = [
    { role: 'Treasurer',   name: 'Alice Smith' },
    { role: 'Secretary',   name: 'Bob Johnson' },
    { role: 'Chairperson', name: 'Carol Lee' },
    { role: 'Member',      name: 'David Wong' },
  ];

  return (
    <>
      <Nav />
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
            {members.map((m, i) => (
              <tr key={i} className={i % 2 ? 'bg-gray-50' : ''}>
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
