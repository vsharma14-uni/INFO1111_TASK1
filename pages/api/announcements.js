import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    console.log('API Route: Request method:', req.method);

    if (req.method === 'POST') {
        try {
            console.log('API Route: Processing POST request with body:', JSON.stringify(req.body, null, 2));
            const { title, content, priority, expiryDate } = req.body;
            
            if (!title || !content) {
                console.log('API Route: Missing required fields');
                return res.status(400).json({
                    status: 'error',
                    message: 'Title and content are required'
                });
            }

            const data = {
                title,
                content,
                priority: priority || 'normal',
                active: true
            };

            if (expiryDate) {
                data.expiryDate = new Date(expiryDate);
            }

            console.log('API Route: Creating announcement with data:', data);

            const announcement = await prisma.announcement.create({
                data
            });

            console.log('API Route: Successfully created announcement:', announcement);

            return res.status(201).json({
                status: 'success',
                message: 'Announcement created successfully',
                data: announcement
            });
        } catch (error) {
            console.error('API Route: Error creating announcement:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error creating announcement: ' + error.message
            });
        }
    }

    if (req.method === 'GET') {
        try {
            console.log('API Route: Processing GET request');
            
            // Get all announcements
            const announcements = await prisma.announcement.findMany({
                where: {
                    active: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            console.log('API Route: Found announcements:', JSON.stringify(announcements, null, 2));

            return res.status(200).json({
                status: 'success',
                announcements: announcements || []
            });

        } catch (error) {
            console.error('API Route: Error fetching announcements:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error fetching announcements: ' + error.message
            });
        }
    }

    return res.status(405).json({ 
        status: 'error',
        message: 'Method not allowed' 
    });
} 