export const config = {
    runtime: 'edge'
  };
  
  export default async function handler(req) {
    return new Response(
      JSON.stringify({ message: "The next strata meeting is on Friday at 6 PM." }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  