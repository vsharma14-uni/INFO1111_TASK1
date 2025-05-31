import Layout from '../components/Layout';
import PhpTest from '../components/PhpTest';

export default function PhpTestPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">PHP Integration Test</h1>
                <PhpTest />
            </div>
        </Layout>
    );
} 