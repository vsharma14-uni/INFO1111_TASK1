import { serialize } from 'cookie';
import prisma from '../../lib/prisma';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { unitNumber, description, priority, contactName, contactEmail } = req.body;
      
      // Validate inputs
      if (!unitNumber || !description || !priority || !contactName || !contactEmail) {
        return res.status(400).json({
          status: 'error',
          message: 'All fields are required'
        });
      }

      // Create maintenance request
      const request = await prisma.maintenanceRequest.create({
        data: {
          unitNumber,
          description,
          priority,
          contactName,
          contactEmail
        }
      });

      // Set cookie for last submission
      const cookieValue = new Date().toISOString();
      res.setHeader('Set-Cookie', serialize('last_maintenance_request', cookieValue, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
      }));

      return res.status(200).json({
        status: 'success',
        message: 'Maintenance request submitted successfully',
        data: request
      });
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error creating maintenance request'
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const requests = await prisma.maintenanceRequest.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.status(200).json({
        status: 'success',
        requests
      });
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error fetching maintenance requests'
      });
    }
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 