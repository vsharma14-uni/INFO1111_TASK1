import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    priority: {
        type: String,
        enum: ['normal', 'medium', 'high'],
        default: 'normal'
    },
    expiryDate: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema); 