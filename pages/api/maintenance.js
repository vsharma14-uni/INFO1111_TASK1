import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    
    if (req.method === 'POST') {
      try {
        const data = req.body;
        const result = await db.collection('maintenance_requests').insertOne({
          ...data,
          timestamp: new Date(),
          status: 'pending'
        });

        res.status(200).json({ success: true, id: result.insertedId });
      } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ error: 'Failed to save maintenance request' });
      }
    } else if (req.method === 'GET') {
      try {
        const requests = await db.collection('maintenance_requests')
          .find({})
          .sort({ timestamp: -1 })
          .toArray();

        res.status(200).json({ success: true, data: requests });
      } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch maintenance requests' });
      }
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
} 