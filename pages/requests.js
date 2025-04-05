import Nav from '../components/Nav';

export default function Requests() {
  return (
    <>
      <Nav/>
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Maintenance Request</h1>
        <form method="POST" action="/api/requests" className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input name="name" className="border p-2 w-full"/>
          </div>
          <div>
            <label className="block">Issue</label>
            <textarea name="issue" className="border p-2 w-full"/>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
