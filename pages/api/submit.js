export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    res.status(200).json({ message: `Thank you, ${name}. Your POST message has been received.` });
  } else if (req.method === 'GET') {
    const { query } = req.query;
    res.status(200).json({ message: `Your GET request with query "${query}" has been received.` });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
