export const config = { runtime: 'edge' };

export default () => {
  // In a real app you'd fetch from a database
  return new Response(
    JSON.stringify({ adminFund: 12500, capitalFund: 8750 }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
