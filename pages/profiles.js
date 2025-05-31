import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        unit_number: '',
        resident_name: '',
        email: '',
        phone: '',
        occupants: 1,
        move_in_date: '',
        emergency_contact: {
            name: '',
            relationship: '',
            phone: '',
        },
    });

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await fetch('/api/profiles');
            const data = await response.json();
            setProfiles(data.data || []);
        } catch (err) {
            setError('Failed to fetch profiles');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create profile');
            }

            await fetchProfiles();
            setFormData({
                unit_number: '',
                resident_name: '',
                email: '',
                phone: '',
                occupants: 1,
                move_in_date: '',
                emergency_contact: {
                    name: '',
                    relationship: '',
                    phone: '',
                },
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('emergency_contact.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                emergency_contact: {
                    ...prev.emergency_contact,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Resident Profiles</h1>

                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Unit Number</label>
                                <input
                                    type="text"
                                    name="unit_number"
                                    value={formData.unit_number}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Resident Name</label>
                                <input
                                    type="text"
                                    name="resident_name"
                                    value={formData.resident_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number of Occupants</label>
                                <input
                                    type="number"
                                    name="occupants"
                                    value={formData.occupants}
                                    onChange={handleChange}
                                    min="1"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Move-in Date</label>
                                <input
                                    type="date"
                                    name="move_in_date"
                                    value={formData.move_in_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Emergency Contact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="emergency_contact.name"
                                        value={formData.emergency_contact.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Relationship</label>
                                    <input
                                        type="text"
                                        name="emergency_contact.relationship"
                                        value={formData.emergency_contact.relationship}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="emergency_contact.phone"
                                        value={formData.emergency_contact.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
                                    ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                {loading ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Resident Directory</h2>
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="h-20 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-red-600">{error}</div>
                    ) : profiles.length > 0 ? (
                        <div className="space-y-4">
                            {profiles.map(profile => (
                                <div key={profile._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold">Unit {profile.unit_number}</h3>
                                            <p className="text-gray-600">{profile.resident_name}</p>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <p>Email: {profile.email}</p>
                                                <p>Phone: {profile.phone}</p>
                                                <p>Occupants: {profile.occupants}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Move-in: {new Date(profile.move_in_date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    {profile.emergency_contact && profile.emergency_contact.name && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">
                                                Emergency Contact: {profile.emergency_contact.name} ({profile.emergency_contact.relationship})
                                                - {profile.emergency_contact.phone}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No resident profiles found.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
} 