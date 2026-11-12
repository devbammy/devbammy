import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineCheck,
  HiOutlineCheckCircle,
  HiOutlineSquare2Stack,
} from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import { gsap, media, useGsap } from '../../lib/gsap';
import LocalTime from '../utils/local-time/LocalTime';
import styles from './contactScreen.module.scss';

const types = ['Web app', 'Mobile app', 'Website or landing page', 'AI feature', 'Something else'];
const empty = { name: '', email: '', type: types[0], message: '', _honey: '' };

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// A contact row that copies its value to the clipboard.
const CopyRow = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button type="button" className={styles.rowLink} onClick={copy}>
      <span className={styles.k}>{label}</span>
      <span className={styles.v}>{value}</span>
      <span className={styles.rowHint} aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </span>
      {copied ? <HiOutlineCheck aria-hidden="true" /> : <HiOutlineSquare2Stack aria-hidden="true" />}
    </button>
  );
};

const ContactScreen = () => {
  const ref = useRef(null);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const year = new Date().getFullYear();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form._honey) return; // a bot filled the hidden field
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          project_type: form.type,
          message: form.message,
          _subject: `${form.type} enquiry from ${form.name}`,
          _replyto: form.email,
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== 'true') {
        throw new Error(data.message || 'The message could not be sent.');
      }
      setStatus('sent');
      setForm(empty);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  useGsap(ref, (mm) => {
    mm.add(media.motion, () => {
      gsap.from('[data-line]', {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.09,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 68%' },
      });
      gsap.from('[data-rule]', {
        scaleX: 0,
        transformOrigin: '0 50%',
        duration: 1.1,
        ease: 'power2.inOut',
        stagger: 0.07,
        scrollTrigger: { trigger: '[data-rows]', start: 'top 85%' },
      });
      gsap.from('[data-row]', {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        scrollTrigger: { trigger: '[data-rows]', start: 'top 85%' },
      });
      gsap.from('[data-form]', {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        scrollTrigger: { trigger: '[data-form]', start: 'top 88%' },
      });
      // The closing name rises letter by letter, tied to the scroll.
      gsap.from('[data-letter]', {
        yPercent: 105,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-mark]', start: 'top 98%', end: 'bottom bottom', scrub: 0.6 },
      });
    });
  });

  return (
    <section ref={ref} className={styles.contact} id="contact" data-screen="Contact">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            <i aria-hidden="true" /> Contact
          </p>
          <h2 className={styles.title}>
            <span className={styles.mask}>
              <span data-line>Have a product</span>
            </span>
            <span className={styles.mask}>
              <span data-line className={styles.soft}>
                to build?
              </span>
            </span>
          </h2>

          <ul className={styles.rows} data-rows>
            <li>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <div data-row>
                <CopyRow label="Email" value={site.email} />
              </div>
            </li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <span className={styles.rule} data-rule aria-hidden="true" />
                <div data-row>
                  <a className={styles.rowLink} href={s.url} target="_blank" rel="noreferrer">
                    <span className={styles.k}>{s.label}</span>
                    <span className={styles.v}>{handle(s.url)}</span>
                    <span className={styles.rowHint}>Open</span>
                    <HiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
            <li>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <div data-row className={styles.rowStatic}>
                <span className={styles.k}>Based in</span>
                <span className={styles.v}>{site.location}</span>
                <span className={styles.rowHint}>
                  <LocalTime timeZone={site.timeZone} /> local time
                </span>
              </div>
              <span className={styles.rule} data-rule aria-hidden="true" />
            </li>
          </ul>
        </div>

        <div className={styles.formWrap} data-form>
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.div
                key="sent"
                className={styles.sent}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <HiOutlineCheckCircle className={styles.sentIcon} aria-hidden="true" />
                <h3>Message sent</h3>
                <p>Thanks for reaching out. I’ll reply to your email within two working days.</p>
                <button type="button" className="btn" onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className={styles.formLead}>
                  Tell me what you are building and when you need it. I reply within two working
                  days.
                </p>
                <div className={styles.fieldRow}>
                  <label className={styles.field}>
                    <span>Your name</span>
                    <input required autoComplete="name" value={form.name} onChange={update('name')} />
                  </label>
                  <label className={styles.field}>
                    <span>Email address</span>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                    />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>What do you need?</span>
                  <select value={form.type} onChange={update('type')}>
                    {types.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>About the project</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="What it does, who uses it, your timeline and budget"
                  />
                </label>

                {/* Honeypot: hidden from people, filled by bots */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                  value={form._honey}
                  onChange={update('_honey')}
                />

                <button
                  type="submit"
                  className={`btn btn--primary ${styles.submit}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  {status !== 'sending' && <HiArrowRight aria-hidden="true" />}
                </button>

                {status === 'error' && (
                  <p className={styles.error} role="alert">
                    {error} Try again, or email me directly at{' '}
                    <a className="link" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="wrap">
        <p className={styles.mark} data-mark aria-hidden="true">
          {site.name.split('').map((ch, i) => (
            <span key={i} className={styles.letterMask}>
              <span data-letter>{ch === ' ' ? ' ' : ch}</span>
            </span>
          ))}
        </p>
        <footer className={styles.footNote}>
          <span>
            © {year} {site.name}, full-stack web and mobile developer
          </span>
          <a className="link" href={site.cv} target="_blank" rel="noopener noreferrer">
            View resume
          </a>
        </footer>
      </div>
    </section>
  );
};

export default ContactScreen;
