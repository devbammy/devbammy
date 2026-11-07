import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowRight, HiOutlineCheckCircle } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import CopyEmail from '../../components/utils/copy-email/CopyEmail';
import Reveal from '../../components/utils/reveal/Reveal';
import styles from './contact.module.scss';

const types = [
  'Web app',
  'Mobile app',
  'Website or landing page',
  'AI feature',
  'Something else',
];
const empty = { name: '', email: '', type: types[0], message: '', _honey: '' };

const Contact = () => {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form._honey) return; // bot filled the hidden field
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
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
      console.log(err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className={`wrap ${styles.page}`}>
      <Reveal className={styles.info}>
        <h1>Start a project</h1>
        <p className={styles.lead}>
          Tell me what you are building, who it is for and when you need it. I
          reply within two working days.
        </p>

        <dl className={styles.facts}>
          <div>
            <dt>Open to</dt>
            <dd>
              Freelance projects, full-time engineering roles and UI
              consultations
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{site.location}, working with clients remotely</dd>
          </div>
        </dl>

        <div className={styles.email}>
          <p>Prefer email?</p>
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <CopyEmail className="btn--sm" />
        </div>
      </Reveal>

      <Reveal delay={0.1} className={styles.formWrap}>
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
              <HiOutlineCheckCircle
                className={styles.sentIcon}
                aria-hidden="true"
              />
              <h2>Message sent</h2>
              <p>
                Thanks for reaching out. I’ll reply to your email within two
                working days.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => setStatus('idle')}
              >
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
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Your name</span>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update('name')}
                  />
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
                  rows={6}
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
      </Reveal>
    </div>
  );
};

export default Contact;
