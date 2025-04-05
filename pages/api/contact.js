export default function handler(req, res) {
  if (req.method === 'POST') {
    // process req.body (you’ll need middleware or use Next.js 13+)
    // Here we just redirect
    res.writeHead(302, { Location: '/thank-you' });
    res.end();
  } else {
    // GET requests not allowed
    res.status(405).json({ error: 'Use POST' });
  }
}
//hehehehe
