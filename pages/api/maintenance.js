import dbConnect from '../../lib/mongodb';
import MaintenanceRequest from '../../models/MaintenanceRequest';

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const requests = await MaintenanceRequest.find({})
                    .sort({ submission_date: -1 });
                res.status(200).json({ data: requests });
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch maintenance requests' });
            }
            break;

        case 'POST':
            try {
                const request = await MaintenanceRequest.create(req.body);
                res.status(201).json({ message: 'Request submitted successfully', data: request });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
} 