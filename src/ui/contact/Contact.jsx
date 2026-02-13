import { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { assets } from '../../assets/asstes';
import styles from './contact.module.scss';

const Contact = ({ setShowContact }) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.sendForm(
        'service_1tv2qto',
        'template_oiwugh5',
        form.current,
        'iNVqJeaiSYeh-cG0L',
      );
      toast.success('Message sent successfully! 😁');
      setShowContact(false);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={() => setShowContact(false)}>
      <div className={styles.contactCard} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={() => setShowContact(false)}
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.content}>
          <header className={styles.header}>
            <h2>
              Get in touch<span>.</span>
            </h2>
            <p>I'm always open to new opportunities and collaborations.</p>
          </header>

          <form ref={form} onSubmit={sendEmail} className={styles.form}>
            <div className={styles.inputWrapper}>
              <input type="text" name="user_name" required placeholder=" " />
              <label>Full Name</label>
              <div className={styles.bar}></div>
            </div>

            <div className={styles.inputWrapper}>
              <input type="email" name="user_email" required placeholder=" " />
              <label>Email Address</label>
              <div className={styles.bar}></div>
            </div>

            <div className={styles.inputWrapper}>
              <textarea name="message" required placeholder=" "></textarea>
              <label>Your Message</label>
              <div className={styles.bar}></div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSending}
            >
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              {!isSending && <div className={styles.btnGlow}></div>}
            </button>
          </form>

          <footer className={styles.footer}>
            <div className={styles.divider}>
              <span>OR FIND ME ON</span>
            </div>
            <div className={styles.socials}>
              {['linkedin', 'github', 'instagram', 'x'].map((plat) => (
                <a
                  key={plat}
                  href={`#${plat}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialIcon}
                >
                  <img src={assets[`${plat}White`]} alt={plat} />
                </a>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
