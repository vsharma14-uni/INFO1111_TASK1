import { serialize } from 'cookie';

// In-memory storage for demo purposes
let submissions = [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        
        // Validate inputs
        if (!name || !email || !message) {
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required'
            });
        }

        // Store submission
        const submission = {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };
        submissions.push(submission);

        // Set cookie
        const cookieValue = new Date().toISOString();
        res.setHeader('Set-Cookie', serialize('last_submission', cookieValue, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            httpOnly: true,
        }));

        return res.status(200).json({
            status: 'success',
            message: 'Message received successfully',
            data: submission
        });
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'success',
            submissions
        });
    }

    return res.status(405).json({ message: 'Method not allowed' });
} 