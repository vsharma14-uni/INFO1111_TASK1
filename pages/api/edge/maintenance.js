import { connectToDatabase } from '../../../lib/mongodb';

export const config = {
  runtime: 'edge',
  regions: ['sfo1'], // Specify the region closest to your MongoDB instance
};

export default async function handler(req) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers,
    });
  }

  try {
    const { db } = await connectToDatabase();
    
    if (req.method === 'POST') {
      try {
        const data = await req.json();
        
        // Validate required fields
        if (!data.unitNumber || !data.description || !data.contactName || !data.contactEmail) {
          return new Response(
            JSON.stringify({ 
              error: 'Missing required fields',
              success: false 
            }),
            {
              status: 400,
              headers
            }
          );
        }

        const result = await db.collection('maintenance_requests').insertOne({
          ...data,
          timestamp: new Date(),
          status: 'pending'
        });

        return new Response(
          JSON.stringify({ 
            success: true, 
            id: result.insertedId,
            message: 'Maintenance request submitted successfully'
          }),
          {
            status: 200,
            headers
          }
        );
      } catch (error) {
        console.error('Database insert error:', error);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to save maintenance request',
            success: false,
          }),
          {
            status: 500,
            headers
          }
        );
      }
    } else if (req.method === 'GET') {
      try {
        const requests = await db.collection('maintenance_requests')
          .find({})
          .sort({ timestamp: -1 })
          .limit(100)
          .toArray();

        return new Response(
          JSON.stringify({ 
            success: true, 
            data: requests 
          }),
          {
            status: 200,
            headers
          }
        );
      } catch (error) {
        console.error('Database fetch error:', error);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to fetch maintenance requests',
            success: false,
          }),
          {
            status: 500,
            headers
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          ...headers,
          'Allow': 'POST, GET'
        }
      }
    );
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Database connection failed',
        success: false,
      }),
      {
        status: 500,
        headers
      }
    );
  }
}
  