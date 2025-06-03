import { serialize } from 'cookie';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, message } = req.body;
            
            // Validate inputs
            if (!name || !email || !message) {
                return res.status(400).json({
                    status: 'error',
                    message: 'All fields are required'
                });
            }

            // Create submission
            const submission = await prisma.contactSubmission.create({
                data: {
                    name,
                    email,
                    message
                }
            });

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
        } catch (error) {
            console.error('Error creating contact submission:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error creating contact submission'
            });
        }
    }

    if (req.method === 'GET') {
        try {
            const submissions = await prisma.contactSubmission.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return res.status(200).json({
                status: 'success',
                submissions
            });
        } catch (error) {
            console.error('Error fetching contact submissions:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error fetching contact submissions'
            });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
} 