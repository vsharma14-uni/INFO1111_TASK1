import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    category: {
        type: String,
        enum: ['general', 'maintenance', 'event', 'emergency', 'notice'],
        default: 'general',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'low',
    },
    publish_date: {
        type: Date,
        default: Date.now,
    },
    expiry_date: {
        type: Date,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    attachments: [{
        filename: String,
        url: String,
        type: String,
    }],
    target_units: {
        type: [String],
        default: [], // Empty array means all units
    },
    acknowledgments: [{
        unit_number: String,
        date: Date,
    }],
    is_active: {
        type: Boolean,
        default: true,
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
AnnouncementSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

// Add index for efficient querying of active announcements
AnnouncementSchema.index({ is_active: 1, publish_date: -1 });

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema); 