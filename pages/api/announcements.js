// In-memory storage for demo purposes
let announcements = [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { title, content, priority, expiryDate } = req.body;
        
        // Validate inputs
        if (!title || !content) {
            return res.status(400).json({
                status: 'error',
                message: 'Title and content are required'
            });
        }

        // Store announcement
        const announcement = {
            id: Date.now().toString(),
            title,
            content,
            priority: priority || 'normal',
            expiryDate,
            createdAt: new Date().toISOString(),
            active: true
        };
        announcements.push(announcement);

        return res.status(200).json({
            status: 'success',
            message: 'Announcement created successfully',
            data: announcement
        });
    }

    if (req.method === 'GET') {
        // Filter out expired announcements
        const currentDate = new Date();
        const activeAnnouncements = announcements.filter(announcement => {
            if (!announcement.expiryDate) return true;
            return new Date(announcement.expiryDate) > currentDate;
        });

        return res.status(200).json({
            status: 'success',
            announcements: activeAnnouncements
        });
    }

    return res.status(405).json({ message: 'Method not allowed' });
} 