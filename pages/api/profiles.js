import { serialize } from 'cookie';
import dbConnect from '../../lib/dbConnect';
import Profile from '../../models/Profile';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { name, unit, email, phone, moveInDate } = req.body;
            
            // Validate inputs
            if (!name || !unit || !email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Name, unit, and email are required'
                });
            }

            // Create profile
            const profile = await Profile.create({
                name,
                unit,
                email,
                phone,
                moveInDate,
            });

            // Set cookie for last profile update
            const cookieValue = new Date().toISOString();
            res.setHeader('Set-Cookie', serialize('last_profile_update', cookieValue, {
                path: '/',
                maxAge: 30 * 24 * 60 * 60, // 30 days
                httpOnly: true,
            }));

            return res.status(201).json({
                status: 'success',
                message: 'Profile created successfully',
                data: profile
            });
        } catch (error) {
            console.error('Profile creation error:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error creating profile'
            });
        }
    }

    if (req.method === 'GET') {
        try {
            const profiles = await Profile.find({})
                .sort({ createdAt: -1 });

            return res.status(200).json({
                status: 'success',
                profiles
            });
        } catch (error) {
            console.error('Profile fetch error:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error fetching profiles'
            });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
} 