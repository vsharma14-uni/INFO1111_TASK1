export const config = { runtime: 'edge' };

import committee from '../../data/committee.json';
import levies from '../../data/levies.json';

export default () => {
  const summary = {
    date: new Date().toISOString(),
    committeeCount: committee.length,
    totalLevies: levies.reduce((sum, l) => sum + l.amount, 0)
  };
  return new Response(JSON.stringify(summary), {
    headers: { 'Content-Type': 'application/json' }
  });
};
