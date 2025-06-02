import { connectToDatabase } from '../../lib/mongodb';
import Announcement from '../../models/Announcement';

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();

        if (req.method === 'GET') {
            const announcements = await db.collection('announcements')
                .find({})
                .sort({ date: -1 })
                .toArray();
            
            res.status(200).json({ success: true, data: announcements });
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
} 