import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        priority: 'normal',
        expiryDate: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/announcements');
            const data = await response.json();
            
            if (data.status === 'success' && Array.isArray(data.announcements)) {
                setAnnouncements(data.announcements);
                setError('');
            } else {
                console.error('Invalid response format:', data);
                setError('Failed to fetch announcements');
                setAnnouncements([]);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setError('Error fetching announcements');
            setAnnouncements([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await fetch('/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                setMessage('Announcement created successfully!');
                setFormData({
                    title: '',
                    content: '',
                    priority: 'normal',
                    expiryDate: ''
                });
                // Fetch updated announcements
                await fetchAnnouncements();
            } else {
                setError(data.message || 'Error creating announcement');
            }
        } catch (error) {
            console.error('Error creating announcement:', error);
            setError('Error creating announcement');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-green-100 text-green-800';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Announcements</h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Announcement Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Create Announcement</h2>
                        {message && (
                            <div className="mb-4 p-4 rounded bg-green-100 text-green-700">
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Content *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded h-32"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="normal">Normal</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Post Announcement
                            </button>
                        </form>
                    </div>

                    {/* Announcements List */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Current Announcements</h2>
                        <div className="space-y-4">
                            {loading ? (
                                <p className="text-gray-500">Loading announcements...</p>
                            ) : announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="border p-4 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg">{announcement.title}</h3>
                                            <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(announcement.priority)}`}>
                                                {announcement.priority}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-2">{announcement.content}</p>
                                        <div className="text-sm text-gray-500">
                                            <p>Posted: {formatDate(announcement.createdAt)}</p>
                                            {announcement.expiryDate && (
                                                <p>Expires: {formatDate(announcement.expiryDate)}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No active announcements.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 