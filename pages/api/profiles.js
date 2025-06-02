import { serialize } from 'cookie';

// In-memory storage for demo purposes
let profiles = [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, unit, email, phone, moveInDate } = req.body;
        
        // Validate inputs
        if (!name || !unit || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Name, unit, and email are required'
            });
        }

        // Store profile
        const profile = {
            id: Date.now().toString(),
            name,
            unit,
            email,
            phone,
            moveInDate,
            createdAt: new Date().toISOString()
        };
        profiles.push(profile);

        // Set cookie for last profile update
        const cookieValue = new Date().toISOString();
        res.setHeader('Set-Cookie', serialize('last_profile_update', cookieValue, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            httpOnly: true,
        }));

        return res.status(200).json({
            status: 'success',
            message: 'Profile created successfully',
            data: profile
        });
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'success',
            profiles: profiles
        });
    }

    return res.status(405).json({ message: 'Method not allowed' });
} 