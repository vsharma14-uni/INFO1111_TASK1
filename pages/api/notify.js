export const config = { runtime: 'edge' };

// Use a named function here:
const notifyHandler = (req) => {
  const email = new URL(req.url).searchParams.get('email') || 'unknown';
  return new Response(
    JSON.stringify({ message: `Notification sent to ${email}` }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};

// Export the named function
export default notifyHandler;
