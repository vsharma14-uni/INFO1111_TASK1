export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Process the form data
      const data = req.body;
      
      const response = {
        status: 'success',
        message: 'Form processed successfully',
        data: data
      };
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server error processing form'
      });
    }
  } else {
    // Handle GET request
    res.status(200).json({
      status: 'active',
      message: 'API server is running'
    });
  }
} 