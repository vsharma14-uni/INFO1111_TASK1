import { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  // Optional state for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example action: alert or console.log
    alert(`Thank you, ${formData.name}. We have received your query!`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <div className={styles.contactContainer}>
        {/* LEFT COLUMN: Image */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/contactus.jpg"
            alt="Contact us"
            layout="responsive"
            width={600}
            height={400}
            className={styles.contactImage}
          />
        </div>

        {/* RIGHT COLUMN: Contact Info & Form */}
        <div className={styles.infoContainer}>
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Feel free to reach out with any questions or suggestions.</p>
          <ul className={styles.contactDetails}>
            <li>
              <strong>Phone:</strong> +61 400 123 456
            </li>
            <li>
              <strong>Email:</strong> contact@stratamanagement.com
            </li>
          </ul>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <label htmlFor="message">Your Query</label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
