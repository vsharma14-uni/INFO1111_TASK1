import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        unit: '',
        email: '',
        phone: '',
        moveInDate: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await fetch('/api/profiles');
            const data = await response.json();
            setProfiles(data.profiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            
            if (data.status === 'success') {
                setMessage('Profile created successfully!');
                setFormData({
                    name: '',
                    unit: '',
                    email: '',
                    phone: '',
                    moveInDate: ''
                });
                fetchProfiles();
            } else {
                setMessage(data.message || 'Error creating profile');
            }
        } catch (error) {
            setMessage('Error creating profile');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Resident Profiles</h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Profile Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Add New Profile</h2>
                        {message && (
                            <div className="mb-4 p-4 rounded bg-green-100 text-green-700">
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Unit Number *</label>
                                <input
                                    type="text"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Move-in Date</label>
                                <input
                                    type="date"
                                    name="moveInDate"
                                    value={formData.moveInDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Add Profile
                            </button>
                        </form>
                    </div>

                    {/* Profiles List */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Current Profiles</h2>
                        <div className="space-y-4">
                            {profiles.map((profile) => (
                                <div
                                    key={profile.id}
                                    className="border p-4 rounded-lg"
                                >
                                    <h3 className="font-semibold">{profile.name}</h3>
                                    <p className="text-gray-600">Unit: {profile.unit}</p>
                                    <p className="text-gray-600">Email: {profile.email}</p>
                                    {profile.phone && (
                                        <p className="text-gray-600">Phone: {profile.phone}</p>
                                    )}
                                    {profile.moveInDate && (
                                        <p className="text-gray-600">
                                            Move-in Date: {new Date(profile.moveInDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            ))}
                            {profiles.length === 0 && (
                                <p className="text-gray-500">No profiles yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 