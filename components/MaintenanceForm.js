import { useState, useEffect } from 'react';

export default function MaintenanceForm() {
    const [formData, setFormData] = useState({
        unit_number: '',
        description: '',
        priority: 'low',
        contact_name: '',
        contact_email: ''
    });
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = '/api/maintenance';

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            const data = JSON.parse(text);
            setRequests(data.data || []);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load maintenance requests. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setSuccessMessage('');

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();
            const data = JSON.parse(text);

            if (data.error) {
                throw new Error(data.error);
            }

            setSuccessMessage('Maintenance request submitted successfully!');
            setFormData({
                unit_number: '',
                description: '',
                priority: 'low',
                contact_name: '',
                contact_email: ''
            });
            fetchRequests();
        } catch (err) {
            console.error('Submit error:', err);
            setError(err.message || 'Failed to submit request. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            default: return 'bg-green-100 text-green-800 border-green-300';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p className="mt-1 text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-6 max-w-md mx-auto">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="bg-green-100 rounded-full p-1">
                                <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-2">
                            <p className="text-xs font-medium text-green-800">{successMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit Number</label>
                        <input
                            type="text"
                            name="unit_number"
                            value={formData.unit_number}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                        <input
                            type="text"
                            name="contact_name"
                            value={formData.contact_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <input
                            type="email"
                            name="contact_email"
                            value={formData.contact_email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
                            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Recent Maintenance Requests</h3>
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : requests.length > 0 ? (
                    <div className="space-y-4">
                        {requests.map(request => (
                            <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-semibold">Unit {request.unit_number}</h4>
                                        <p className="text-gray-600 mt-1">{request.description}</p>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <p>Contact: {request.contact_name}</p>
                                            <p>Email: {request.contact_email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
                                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                    </span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-500">
                                    <div className="flex justify-between items-center">
                                        <span>Status: <span className="font-medium">{request.status}</span></span>
                                        <span>Submitted: {formatDate(request.submission_date)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">No maintenance requests found.</p>
                )}
            </div>
        </div>
    );
} 