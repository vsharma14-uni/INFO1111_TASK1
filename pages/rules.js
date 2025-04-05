import Nav from '../components/Nav';
export default function Rules() {
  return (
    <>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-semibold">House Rules</h1>
        <ol className="list-decimal ml-5">
          <li>No loud music after 10 pm.</li>
          <li>Pets must be registered with the body corporate.</li>
        </ol>
      </main>
    </>
  );
}
