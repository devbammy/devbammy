import { useState } from 'react';
import styles from './contact.module.scss';
import { useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API form submission tracking
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <section className={styles.contactHeader}>
        <h1>Let's start a project</h1>
        <p>
          Have an idea or an upcoming product blueprint? Drop a message below
          and let's build something exceptional together.
        </p>
      </section>

      <section>
        <div className={styles.infoSidebar}>
          <div className={styles.infoBlock}>
            <h4>Availability</h4>
            <p>
              Currently accepting selective freelance contracts, full-time
              engineering roles, and UI architecture design consultations.
            </p>
          </div>

          <div className={styles.infoBlock}>
            <h4>Response Time</h4>
            <p>
              I generally read and respond to inquiries within 24–48 business
              hours.
            </p>
          </div>

          <div className={styles.infoBlock}>
            <h4>Direct Communication</h4>
            <a href="mailto:devbammy@gmail.com" className={styles.emailLink}>
              devbammy@gmail.com
            </a>
          </div>
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              placeholder="Elias Norden"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              required
              placeholder="elias@norden.design"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Project Description</label>
            <textarea
              id="message"
              rows="6"
              required
              placeholder="Tell me about your mobile application workflow, timeline, or design goals..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
            <span className={styles.arrow}>&rarr;</span>
          </button>

          {status === 'success' && (
            <p className={styles.successMsg}>
              Message received! I'll get back to you shortly.
            </p>
          )}
        </form>
      </section>
    </>
  );
};

export default Contact;
