import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', MONGODB_URI ? 'URI is defined' : 'URI is missing');
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB!');
        
        // Test creating a collection
        const db = mongoose.connection.db;
        await db.createCollection('test');
        console.log('Successfully created test collection');
        
        // Clean up
        await db.dropCollection('test');
        console.log('Successfully cleaned up test collection');
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

testConnection(); 