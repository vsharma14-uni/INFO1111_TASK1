import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [lastSubmission, setLastSubmission] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check for last submission cookie
        const lastSub = Cookies.get('last_submission');
        if (lastSub) {
            setLastSubmission(lastSub);
        }

        // Fetch previous submissions
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();
            if (data.status === 'success') {
                setSubmissions(data.submissions || []);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setStatus(data.status);

            if (data.status === 'success') {
                setFormData({ name: '', email: '', message: '' });
                setSuccessMessage('Thank you for your message! We will get back to you soon.');
                fetchSubmissions();
                const newLastSub = Cookies.get('last_submission');
                if (newLastSub) {
                    setLastSubmission(newLastSub);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="4"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
                            ${status === 'sending' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {status === 'sending' ? 'Sending...' : 'Submit'}
                    </button>
                </div>
            </form>

            {submissions.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Previous Submissions</h3>
                    <div className="space-y-4">
                        {submissions.map((sub, index) => (
                            <div key={index} className="border-b pb-4">
                                <p><strong>Name:</strong> {sub.name}</p>
                                <p><strong>Email:</strong> {sub.email}</p>
                                <p><strong>Message:</strong> {sub.message}</p>
                                <p className="text-sm text-gray-500">Submitted: {sub.timestamp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 