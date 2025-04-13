// pages/form.js
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Request.module.css';

export default function RequestPage() {
  // State for POST form data
  const [postFormData, setPostFormData] = useState({ name: '', email: '', message: '' });
  const [postResponseMsg, setPostResponseMsg] = useState('');

  // State for GET form data
  const [getFormData, setGetFormData] = useState({ query: '' });
  const [getResponseMsg, setGetResponseMsg] = useState('');

  // POST form submission
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

  // GET form submission
  const handleGetSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/submit?query=${encodeURIComponent(getFormData.query)}`, {
      method: 'GET'
    });
    const data = await res.json();
    setGetResponseMsg(data.message);
  };

  return (
    <Layout>
      <div className={styles.requestContainer}>
        {/* Left side: forms */}
        <div className={styles.formsSection}>
          <h2>Submit a Request</h2>

          <div className={styles.formBlock}>
            <h3>POST Form (Sensitive Data)</h3>
            <form onSubmit={handlePostSubmit}>
              <label>Name</label>
              <input
                type="text"
                value={postFormData.name}
                onChange={(e) => setPostFormData({ ...postFormData, name: e.target.value })}
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={postFormData.email}
                onChange={(e) => setPostFormData({ ...postFormData, email: e.target.value })}
                required
              />

              <label>Message</label>
              <textarea
                rows="4"
                value={postFormData.message}
                onChange={(e) => setPostFormData({ ...postFormData, message: e.target.value })}
                required
              />
              
              <button type="submit">Submit via POST</button>
            </form>
            {postResponseMsg && <p className={styles.responseMsg}>{postResponseMsg}</p>}
          </div>

          <div className={styles.formBlock}>
            <h3>GET Form (Non-Sensitive Data)</h3>
            <form onSubmit={handleGetSubmit}>
              <label>Your Query</label>
              <input
                type="text"
                value={getFormData.query}
                onChange={(e) => setGetFormData({ ...getFormData, query: e.target.value })}
                required
              />
              <button type="submit">Submit via GET</button>
            </form>
            {getResponseMsg && <p className={styles.responseMsg}>{getResponseMsg}</p>}
          </div>
        </div>

        {/* Right side: explanation */}
        <div className={styles.infoSection}>
          <h3>Understanding GET vs. POST</h3>
          <p>
            <strong>GET:</strong> Used to retrieve data. Form data is appended to the URL as
            query parameters (visible in the address bar), making it less suitable for sensitive
            information.
          </p>
          <p>
            <strong>POST:</strong> Used to send data to the server. Data is sent in the request
            body, making it more secure and appropriate when sensitive information is involved.
          </p>
        </div>
      </div>
    </Layout>
  );
}
