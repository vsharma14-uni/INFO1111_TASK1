import { MongoClient } from 'mongodb';
import dns from 'dns';

// Configure DNS to use Google's DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        
        // Convert mongodb+srv:// to mongodb:// for direct connection
        const directUri = MONGODB_URI.replace('mongodb+srv://', 'mongodb://').replace(
            '.mongodb.net',
            '.mongodb.net:27017'
        );

        const client = new MongoClient(directUri, {
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            directConnection: true,
            retryWrites: true,
            ssl: true
        });

        await client.connect();
        const db = client.db(MONGODB_DB);

        // Test the connection
        await db.command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        cachedClient = client;
        cachedDb = db;

        return { client, db };
    } catch (error) {
        console.error('MongoDB connection error:', error);
        
        // Clear cache if there was an error
        cachedClient = null;
        cachedDb = null;
        
        throw new Error('Unable to connect to MongoDB');
    }
} 