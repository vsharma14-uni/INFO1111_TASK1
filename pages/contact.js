import ContactForm from '../components/ContactForm';
import Layout from '../components/Layout';

export default function Contact() {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Contact Us
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </Layout>
    );
}
