import Layout from '../components/Layout';
import MaintenanceForm from '../components/MaintenanceForm';

export default function MaintenancePage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Strata Maintenance Requests</h1>
                <p className="text-gray-600 mb-8">
                    Use this form to submit maintenance requests for your unit. Our team will review your request
                    and respond within 24-48 business hours. For emergency maintenance issues, please call our
                    24/7 emergency line.
                </p>
                <MaintenanceForm />
            </div>
        </Layout>
    );
} 