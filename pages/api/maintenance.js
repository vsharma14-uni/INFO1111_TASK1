import { serialize } from 'cookie';

// In-memory storage for demo purposes
let maintenanceRequests = [];

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default function handler(req, res) {
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
    const { unitNumber, description, priority, contactName, contactEmail } = req.body;
    
    // Validate inputs
    if (!unitNumber || !description || !priority || !contactName || !contactEmail) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    // Store maintenance request
    const request = {
      unitNumber,
      description,
      priority,
      contactName,
      contactEmail,
      status: 'pending',
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    maintenanceRequests.push(request);

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
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'success',
      requests: maintenanceRequests
    });
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 