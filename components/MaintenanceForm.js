import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function MaintenanceForm() {
    const [formData, setFormData] = useState({
        unitNumber: '',
        description: '',
        priority: 'low',
        contactName: '',
        contactEmail: ''
    });
    const [status, setStatus] = useState('');
    const [requests, setRequests] = useState([]);
    const [lastSubmission, setLastSubmission] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check for last submission cookie
        const lastSub = Cookies.get('last_maintenance_request');
        if (lastSub) {
            setLastSubmission(lastSub);
        }

        // Fetch previous submissions
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/maintenance');
            const data = await response.json();
            if (data.status === 'success') {
                setRequests(data.requests || []);
            }
        } catch (error) {
            console.error('Error fetching maintenance requests:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/maintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setStatus(data.status);

            if (data.status === 'success') {
                setFormData({
                    unitNumber: '',
                    description: '',
                    priority: 'low',
                    contactName: '',
                    contactEmail: ''
                });
                setSuccessMessage('Your maintenance request has been submitted successfully!');
                fetchRequests();
                const newLastSub = Cookies.get('last_maintenance_request');
                if (newLastSub) {
                    setLastSubmission(newLastSub);
                }
            }
        } catch (error) {
            console.error('Error submitting maintenance request:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const priorityColors = {
        low: 'bg-blue-100 text-blue-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {lastSubmission && (
                <div className="mb-4 text-sm text-gray-600">
                    Last submission: {lastSubmission}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit Number</label>
                        <input
                            type="text"
                            name="unitNumber"
                            value={formData.unitNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                        <input
                            type="text"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <input
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
                            ${status === 'sending' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {status === 'sending' ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>

            {requests.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Maintenance Requests</h3>
                    <div className="space-y-4">
                        {requests.map((request) => (
                            <div key={request.id} className="border-b pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p><strong>Unit:</strong> {request.unitNumber}</p>
                                        <p><strong>Description:</strong> {request.description}</p>
                                        <p><strong>Contact:</strong> {request.contactName} ({request.contactEmail})</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[request.priority]}`}>
                                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Submitted: {request.timestamp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 