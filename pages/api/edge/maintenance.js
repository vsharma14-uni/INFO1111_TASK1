export const config = {
    runtime: 'edge'
  };
  
  export default async function handler(req) {
    return new Response(
      JSON.stringify({ message: "Maintenance is scheduled for Sunday at 2 AM." }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  