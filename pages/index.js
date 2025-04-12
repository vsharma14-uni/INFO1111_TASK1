import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.heroContainer}>
        <h1 className={styles.overlayTitle}>WELCOME TO THE STRATA WEBSITE</h1>
      </div>
    </Layout>
  );
}
