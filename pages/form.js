import { useState } from "react";
import Layout from '../components/Layout';

export default function FormPage() {
  const [postFormData, setPostFormData] = useState({ name: '', email: '', message: '' });
  const [getFormData, setGetFormData] = useState({ query: '' });
  const [postResponseMsg, setPostResponseMsg] = useState("");
  const [getResponseMsg, setGetResponseMsg] = useState("");

  // Handler for POST form
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postFormData)
    });
    const data = await res.json();
    setPostResponseMsg(data.message);
  };

  // Handler for GET form
  const handleGetSubmit = async (e) => {
    e.preventDefault();
    // For GET, the data will be appended as a query string.
    const res = await fetch(`/api/submit?query=${encodeURIComponent(getFormData.query)}`, { method: 'GET' });
    const data = await res.json();
    setGetResponseMsg(data.message);
  };

  return (
    <Layout>
      <h1>Submit a Request</h1>
      
      <section>
        <h2>POST Form (Sensitive Data)</h2>
        <form onSubmit={handlePostSubmit}>
          <label>
            Name:
            <input 
              type="text"
              value={postFormData.name}
              onChange={(e) => setPostFormData({ ...postFormData, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            Email:
            <input 
              type="email"
              value={postFormData.email}
              onChange={(e) => setPostFormData({ ...postFormData, email: e.target.value })}
            />
          </label>
          <br />
          <label>
            Message:
            <textarea
              value={postFormData.message}
              onChange={(e) => setPostFormData({ ...postFormData, message: e.target.value })}
            ></textarea>
          </label>
          <br />
          <button type="submit">Submit via POST</button>
        </form>
        <p>{postResponseMsg}</p>
      </section>

      <section>
        <h2>GET Form (Non-Sensitive Data)</h2>
        <form onSubmit={handleGetSubmit}>
          <label>
            Your Query:
            <input 
              type="text"
              value={getFormData.query}
              onChange={(e) => setGetFormData({ ...getFormData, query: e.target.value })}
            />
          </label>
          <br />
          <button type="submit">Submit via GET</button>
        </form>
        <p>{getResponseMsg}</p>
      </section>

      <section>
        <h3>Understanding GET vs. POST</h3>
        <p>
          <strong>GET:</strong> Used to retrieve data. The form data is appended to the URL as query parameters (visible in the address bar), making it less suitable for sensitive information.
        </p>
        <p>
          <strong>POST:</strong> Used to send data to the server. Data is sent in the request body, making it more secure and appropriate when sensitive information is involved.
        </p>
      </section>
    </Layout>
  );
}
