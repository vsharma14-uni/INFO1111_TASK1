import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        <h2>About Strata Management</h2>
        <p>
          Welcome to Strata Management, your trusted partner in managing and maintaining strata-titled apartment buildings. We specialize in overseeing day-to-day operations to ensure our communities remain safe, efficient, and harmonious. Our dedicated team is committed to transparency, responsiveness, and providing personalized service to every resident.
        </p>
        <p>
          Our comprehensive services include proactive maintenance scheduling, efficient management of levies and budgets, and the coordination of community events and meetings. With a deep understanding of the unique challenges that come with strata living, we customize solutions that cater to the needs of each community we serve.
        </p>
        <p>
          With years of expertise and a passion for building sustainable communities, our mission is to foster a safe and thriving environment where every resident feels at home. We believe in clear communication, timely problem resolution, and continuous improvement in every aspect of property management.
        </p>
        <p>
          Thank you for choosing Strata Management. We look forward to working with you and contributing to a vibrant, well-maintained community.
        </p>
      </div>
    </Layout>
  );
}
