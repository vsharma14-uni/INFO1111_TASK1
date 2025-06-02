import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const cookieConsent = Cookies.get('cookie-consent');
        if (!cookieConsent) {
            setShowConsent(true);
        }
    }, []);

    const handleAccept = () => {
        // Set cookie consent for 30 days
        Cookies.set('cookie-consent', 'accepted', { expires: 30 });
        setShowConsent(false);
    };

    const handleDecline = () => {
        // Set cookie consent as declined (still save the choice to prevent showing again)
        Cookies.set('cookie-consent', 'declined', { expires: 30 });
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
                    <p className="text-sm text-gray-300">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        By clicking "Accept", you consent to our use of cookies for these purposes.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
} 