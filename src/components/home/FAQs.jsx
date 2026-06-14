import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Title from '../utils/title/Title';
import { faqData } from '../../assets/data/faqData';
import styles from './homeComps.module.scss';

const FAQs = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={styles.fAQs}>
      <Title text="FAQs" />

      <div className={styles.faqWrapper}>
        <div className={styles.faqContainer}>
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className={styles.faqItem}>
                {/* Trigger Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className={styles.faqTrigger}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqQuestion}>{faq.question}</span>

                  {/* Plus/Minus Interactive Box */}
                  <div className={styles.faqIconBox}>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </motion.svg>
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <div className={styles.faqAnswerContent}>
                        <div className={styles.faqAnswerInner}>
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
