export const config = { runtime: 'edge' };
export default (req) => {
  const email = new URL(req.url).searchParams.get('email') || 'unknown';
  return new Response(
    JSON.stringify({ message: `Notification sent to ${email}` }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
