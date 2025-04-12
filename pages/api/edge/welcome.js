export const config = {
    runtime: 'edge'
  };
  
  export default async function handler(req) {
    return new Response(
      JSON.stringify({ message: "Welcome to our Strata Management System!" }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  