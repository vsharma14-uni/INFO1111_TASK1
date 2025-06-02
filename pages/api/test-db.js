import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    // Try to get environment variables
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;
    
    // Mask sensitive information
    const maskedUri = uri ? uri.replace(/\/\/.*@/, '//<credentials>@') : 'not set';
    
    res.status(200).json({
      envCheck: {
        hasUri: !!uri,
        hasDbName: !!dbName,
        maskedUri: maskedUri,
        dbName: dbName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 