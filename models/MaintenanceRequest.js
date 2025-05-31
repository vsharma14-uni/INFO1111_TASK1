import mongoose from 'mongoose';

const MaintenanceRequestSchema = new mongoose.Schema({
    unit_number: {
        type: String,
        required: [true, 'Unit number is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'low',
    },
    contact_name: {
        type: String,
        required: [true, 'Contact name is required'],
    },
    contact_email: {
        type: String,
        required: [true, 'Contact email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'cancelled'],
        default: 'pending',
    },
    submission_date: {
        type: Date,
        default: Date.now,
    },
    completion_date: {
        type: Date,
    },
    notes: [{
        text: String,
        date: { type: Date, default: Date.now },
        author: String,
    }],
});

export default mongoose.models.MaintenanceRequest || mongoose.model('MaintenanceRequest', MaintenanceRequestSchema); 