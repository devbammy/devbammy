import { reviews } from '../../../assets/asstes';
import styles from './home.module.scss';
import { motion } from 'framer-motion';

const Reviews = () => {
  // Fade-up animation variant
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Container variant to stagger children
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.section
      className={styles.reviews}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <motion.h2 className={styles.title} variants={fadeUp}>
        What Clients Say
      </motion.h2>

      <motion.div className={styles.reviewList} variants={container}>
        {reviews.map((review, idx) => (
          <motion.div key={idx} className={styles.reviewCard} variants={fadeUp}>
            <p className={styles.content}>"{review.content}"</p>
            <div className={styles.reviewer}>
              <p className={styles.name}>{review.name}</p>
              <p className={styles.company}>{review.company}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Reviews;
