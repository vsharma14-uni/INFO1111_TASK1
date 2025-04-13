import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Faq.module.css';

// Expanded list of FAQs for demonstration
const faqs = [
  {
    question: 'How do I report maintenance issues?',
    answer: 'Use our form to submit a request, or reach out via email if urgent.',
  },
  {
    question: 'When is the next meeting?',
    answer: 'Check the notices or our Events page. We also post updates via our serverless edge functions!',
  },
  {
    question: 'How are levies calculated?',
    answer: 'Levies fund building insurance, common area maintenance, and future capital works.',
  },
  {
    question: 'Can I renovate my apartment?',
    answer: 'Minor cosmetic changes are allowed. For structural modifications, please get approval from the Strata Committee.',
  },
  {
    question: 'Where can I find strata documents?',
    answer: 'Important documents, like by-laws and annual budgets, can be found on the Documents page under the Owners Portal.',
  },
  {
    question: 'Who do I contact if I notice a safety hazard?',
    answer: 'Contact the Strata Committee immediately. Use the emergency contact listed on our Contact page if it’s urgent.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <Layout>
      <div className={styles.faqContainer}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={styles.faqItem}>
                <div
                  className={styles.faqQuestion}
                  onClick={() => handleToggle(index)}
                >
                  {faq.question}
                </div>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
