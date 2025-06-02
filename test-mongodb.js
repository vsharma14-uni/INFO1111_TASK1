const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function testConnection() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error('MongoDB connection error:', error);
    } finally {
        await client.close();
    }
}

testConnection(); 