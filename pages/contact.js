import Nav from '../components/Nav';

export default function Contact() {
  return (
    <>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
        <form method="POST" action="#" className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input name="name" className="border p-2 w-full" />
          </div>
          <div>
            <label className="block">Message</label>
            <textarea name="message" className="border p-2 w-full" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Send
          </button>
        </form>
      </main>
    </>
  );
}
