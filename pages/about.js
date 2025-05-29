import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>About Our Community</h1>
        </section>

        {/* Main Content Section */}
        <section className={styles.content}>
          <p>
            Welcome to <strong>Strata Harmony</strong> – where modern management meets genuine community care. Nestled in the heart of New South Wales, our journey began with a simple idea: to transform the way apartment living feels and functions. In a world of busy schedules and ever-changing demands, we believe that a well-managed building is the cornerstone of a thriving community.
          </p>
          <p>
            Governing our strata-titled buildings under the guidance of the{' '}
            <strong>Strata Schemes Management Act (2015)</strong>, we understand that each unit is more than just a space – it’s a home. Our owners’ corporation, known affectionately as the body corporate, works tirelessly to maintain common areas, coordinate essential repairs, and secure top-quality building insurance. With levies contributing to both administration and future capital works, every resident plays a pivotal role in our story.
          </p>
          <p>
            Our dedicated <strong>Strata Committee</strong> – composed of an experienced Treasurer, an organized Secretary, and a visionary Chairperson, along with a vibrant team of representatives – is committed to creating an environment where every voice is heard. Elected by our community, we continuously innovate to make life easier: from streamlined maintenance requests to creative community events that bring neighbors together.
          </p>
          <p>
            At Strata Harmony, we are not just about managing buildings; we are about nurturing a lifestyle where transparency, responsiveness, and a personal touch make all the difference. Imagine a place where modern technology meets the warmth of community spirit – that’s the home we’re building together.
          </p>
          <p>
            Thank you for trusting us to support your home and your lifestyle. We’re excited to journey forward together, shaping a brighter, more connected future for our entire community.
          </p>
        </section>
      </div>
    </Layout>
  );
}
//helo
