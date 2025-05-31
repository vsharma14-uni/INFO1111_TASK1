import dbConnect from '../../lib/mongodb';
import UserProfile from '../../models/UserProfile';

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const { unit_number } = req.query;
                let query = unit_number ? { unit_number } : {};
                
                const profiles = await UserProfile.find(query)
                    .sort({ unit_number: 1 });
                res.status(200).json({ data: profiles });
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch user profiles' });
            }
            break;

        case 'POST':
            try {
                const profile = await UserProfile.create(req.body);
                res.status(201).json({ message: 'Profile created successfully', data: profile });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        case 'PUT':
            try {
                const { unit_number } = req.query;
                if (!unit_number) {
                    return res.status(400).json({ error: 'Unit number is required' });
                }

                const profile = await UserProfile.findOneAndUpdate(
                    { unit_number },
                    req.body,
                    { new: true, runValidators: true }
                );

                if (!profile) {
                    return res.status(404).json({ error: 'Profile not found' });
                }

                res.status(200).json({ message: 'Profile updated successfully', data: profile });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
} 