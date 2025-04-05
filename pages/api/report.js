import committee from '../../data/committee.json';
import levies from '../../data/levies.json';

export const config = { runtime: 'edge' };

// Use a named function here:
const reportHandler = () => {
  const summary = {
    date: new Date().toISOString(),
    committeeCount: committee.length,
    totalLevies: levies.reduce((sum, lev) => sum + lev.amount, 0),
  };
  return new Response(JSON.stringify(summary), {
    headers: { 'Content-Type': 'application/json' },
  });
};

// Export the named function
export default reportHandler;
