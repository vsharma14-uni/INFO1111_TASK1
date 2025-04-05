export default function handler(req, res) {
    if (req.method === 'POST') {
      res.writeHead(302, { Location: '/thank-you' });
      return res.end();
    }
    res.status(405).json({ error: 'Use POST' });
  }
  