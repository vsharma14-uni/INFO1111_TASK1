export const config = { runtime: 'edge' };

const statusHandler = () => {
  const data = {
    adminFund: 12500,
    capitalFund: 8750,
  };
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export default statusHandler;
