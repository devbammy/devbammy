import React, { useRef } from 'react';
import { socialLinks } from '../../../assets/asstes';
import { useTheme } from '../../../context/ThemeContext';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import styles from './home.module.scss';
import { motion } from 'framer-motion';

const Contact = () => {
  const { theme } = useTheme();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_1tv2qto',
        'template_oiwugh5',
        form.current,
        'iNVqJeaiSYeh-cG0L'
      )
      .then(
        () => toast.success('Message sent successfully😁'),
        (error) => {
          console.log(error.text);
          toast.error('An error occurred, please try again later.');
        }
      );
    e.target.reset();
  };

  // Variants for columns
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };
  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Variants for form fields
  const fieldVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Container for form fields to stagger them
  const formContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.row}>
        {/* Left Column: Text + Socials */}
        <motion.div
          className={styles.col}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <h2>Contact me for collaborations</h2>
          <p>
            I’d love to hear from you! Whether you have a project idea, a
            question, or just want to connect, feel free to reach out. Let’s
            create something amazing together.
          </p>

          <div className={styles.socials}>
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                aria-label={link.alt}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={link.icon} alt={link.alt} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          className={styles.col}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
        >
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={formContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={styles.formControl} variants={fieldVariant}>
              <label htmlFor="name">Your Full Name</label>
              <input type="text" placeholder="John Doe" name="user_name" />
            </motion.div>

            <motion.div className={styles.formControl} variants={fieldVariant}>
              <label htmlFor="email">Your Email</label>
              <input
                type="text"
                placeholder="example@mail.com"
                name="user_email"
              />
            </motion.div>

            <motion.div className={styles.formControl} variants={fieldVariant}>
              <label htmlFor="company">
                Your Company/Organization (Optional)
              </label>
              <input
                type="text"
                placeholder="Company/Organization"
                name="company"
              />
            </motion.div>

            <motion.div className={styles.formControl} variants={fieldVariant}>
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
              ></textarea>
            </motion.div>

            <motion.button variants={fieldVariant}>Send Message</motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
