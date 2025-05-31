import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      const data = req.body;
      
      const result = await db.collection('maintenance_requests').insertOne({
        ...data,
        timestamp: new Date(),
        status: 'pending'
      });

      res.status(200).json({ success: true, id: result.insertedId });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to save maintenance request' });
    }
  } else if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const requests = await db.collection('maintenance_requests')
        .find({})
        .sort({ timestamp: -1 })
        .toArray();

      res.status(200).json(requests);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch maintenance requests' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 