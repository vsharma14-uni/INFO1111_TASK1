export default function handler(req, res) {
    // Using HTTP status code 307 for a temporary redirect.
    res.status(307).redirect('/thank-you');
  }
  