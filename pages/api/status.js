// pages/api/status.js
export const config = { runtime: 'edge' };

const statusHandler = () => {
  return new Response(
    JSON.stringify({ adminFund: 12500, capitalFund: 8750 }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};

export default statusHandler;
