export default function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, message } = req.body;
      // Here you might process or store the data. For now, we simply return a success message.
      res.status(200).json({ message: `Thank you, ${name}. Your message has been received.` });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  