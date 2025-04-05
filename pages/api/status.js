export const config = { runtime: 'edge' };
export default () => new Response(
  JSON.stringify({ adminFund: 12500, capitalFund: 8750 }),
  { headers: { 'Content-Type': 'application/json' } }
);
