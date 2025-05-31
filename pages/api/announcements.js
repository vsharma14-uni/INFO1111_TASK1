import dbConnect from '../../lib/mongodb';
import Announcement from '../../models/Announcement';

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const { category, is_active } = req.query;
                let query = {};

                if (category) {
                    query.category = category;
                }

                if (is_active !== undefined) {
                    query.is_active = is_active === 'true';
                }

                // Only show active announcements that haven't expired
                query = {
                    ...query,
                    $or: [
                        { expiry_date: { $gt: new Date() } },
                        { expiry_date: null }
                    ],
                    is_active: true
                };

                const announcements = await Announcement.find(query)
                    .sort({ priority: -1, publish_date: -1 });
                res.status(200).json({ data: announcements });
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch announcements' });
            }
            break;

        case 'POST':
            try {
                const announcement = await Announcement.create(req.body);
                res.status(201).json({ message: 'Announcement created successfully', data: announcement });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        case 'PUT':
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({ error: 'Announcement ID is required' });
                }

                const announcement = await Announcement.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true, runValidators: true }
                );

                if (!announcement) {
                    return res.status(404).json({ error: 'Announcement not found' });
                }

                res.status(200).json({ message: 'Announcement updated successfully', data: announcement });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({ error: 'Announcement ID is required' });
                }

                const announcement = await Announcement.findByIdAndDelete(id);

                if (!announcement) {
                    return res.status(404).json({ error: 'Announcement not found' });
                }

                res.status(200).json({ message: 'Announcement deleted successfully' });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
} 