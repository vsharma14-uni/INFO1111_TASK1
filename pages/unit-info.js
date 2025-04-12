import Layout from '../components/Layout';
import { useState } from 'react';

export default function UnitInfo() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Layout>
      <h2>Unit Information</h2>
      <p>Find detailed information about your unit here.</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <p>Your unit features: 2 bedrooms, 2 bathrooms, ample parking and balcony.</p>}
    </Layout>
  );
}
