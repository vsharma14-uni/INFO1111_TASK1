import Layout from '../components/Layout';
import styles from '../styles/Events.module.css';

const events = [
  {
    id: 1,
    date: '2025-05-12',
    title: 'Community BBQ',
    time: '12:00 PM',
    description: 'Join us for a friendly community BBQ in the courtyard featuring delicious food, live music, and fun activities for all ages.',
  },
  {
    id: 2,
    date: '2025-06-01',
    title: 'Maintenance Meeting',
    time: '6:00 PM',
    description: 'Discuss upcoming maintenance projects and budget updates with the management team. Attendance is highly recommended for all owners.',
  },
  {
    id: 3,
    date: '2025-06-15',
    title: 'Pool Party',
    time: '3:00 PM',
    description: 'Celebrate summer with a splash! Enjoy a pool party with games, snacks, and a relaxed vibe. Bring your family and friends!',
  },
  {
    id: 4,
    date: '2025-07-04',
    title: 'Independence Celebration',
    time: '5:00 PM',
    description: 'Enjoy a festive celebration with themed performances, food stalls, and interactive activities for kids and adults alike.',
  },
  {
    id: 5,
    date: '2025-08-20',
    title: 'Yoga and Wellness',
    time: '7:00 AM',
    description: 'Start your day with a refreshing yoga session followed by a wellness talk in the community park.',
  },
  {
    id: 6,
    date: '2025-09-30',
    title: 'Autumn Festival',
    time: '2:00 PM',
    description: 'Experience the beauty of autumn through a festival featuring local artists, craft stalls, and seasonal treats.',
  },
];

export default function Events() {
  return (
    <Layout>
      <div className={styles.eventsContainer}>
        <h2>Upcoming Events</h2>
        <div className={styles.calendarGrid}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventDate}>
                {new Date(event.date).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              <div className={styles.eventDetails}>
                <h3>{event.title}</h3>
                <p className={styles.eventTime}>{event.time}</p>
                <p className={styles.eventDescription}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
