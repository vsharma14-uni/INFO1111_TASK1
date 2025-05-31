import { useState, useEffect } from 'react';

export default function PhpTest() {
    const [phpData, setPhpData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhpData();
    }, []);

    const fetchPhpData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/php/test.php');
            
            if (!response.ok) {
                const text = await response.text();
                console.error('Response not OK:', response.status, text);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('PHP Response:', data);
            setPhpData(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching PHP data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/php/form-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testData: 'This is a test submission',
                    timestamp: new Date().toISOString()
                })
            });
            
            if (!response.ok) {
                const text = await response.text();
                console.error('Form submission error:', response.status, text);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Form submission response:', data);
            alert('Form submitted successfully!');
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Error submitting form: ' + err.message);
        }
    };

    if (loading) return (
        <div className="p-4">
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-3 mt-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="p-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
                <button
                    onClick={fetchPhpData}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">PHP Test Component</h2>
            
            <div className="mb-4">
                <h3 className="text-xl font-semibold">PHP Server Info:</h3>
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify(phpData, null, 2)}
                </pre>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Test Form Submission</h3>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit Test Data
                </button>
            </div>
        </div>
    );
} 