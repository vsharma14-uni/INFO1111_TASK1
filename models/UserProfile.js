import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
    unit_number: {
        type: String,
        required: [true, 'Unit number is required'],
        unique: true,
    },
    resident_name: {
        type: String,
        required: [true, 'Resident name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    occupants: {
        type: Number,
        required: [true, 'Number of occupants is required'],
        min: [1, 'Must have at least 1 occupant'],
    },
    move_in_date: {
        type: Date,
        required: [true, 'Move-in date is required'],
    },
    parking_spots: [{
        spot_number: String,
        vehicle_plate: String,
    }],
    emergency_contact: {
        name: String,
        relationship: String,
        phone: String,
    },
    preferences: {
        newsletter_subscription: {
            type: Boolean,
            default: true,
        },
        notification_method: {
            type: String,
            enum: ['email', 'sms', 'both'],
            default: 'email',
        },
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

// Update the 'updated_at' field on save
UserProfileSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema); 