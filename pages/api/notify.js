export const config = { runtime: 'edge' };

export default (req) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || 'unknown';
  // Mock notification logic
  return new Response(
    JSON.stringify({ message: `Notification sent to ${email}` }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
