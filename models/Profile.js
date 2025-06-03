import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    unit: {
        type: String,
        required: [true, 'Unit number is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
        type: String,
    },
    moveInDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema); 