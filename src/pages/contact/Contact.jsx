import { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { site } from '../../assets/data/site';
import CopyEmail from '../../components/utils/copy-email/CopyEmail';
import styles from './contact.module.scss';

const types = ['Web app', 'Mobile app', 'Website or landing page', 'AI feature', 'Something else'];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', type: types[0], message: '' });
  const [opened, setOpened] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // No backend: the form writes the email for the visitor and opens their mail app.
  const submit = (e) => {
    e.preventDefault();
    const subject = `${form.type} enquiry from ${form.name}`;
    const body = `${form.message}\n\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <div className={`wrap ${styles.page}`}>
      <div className={styles.info}>
        <h1>Start a project</h1>
        <p className={styles.lead}>
          Tell me what you are building, who it is for and when you need it. I reply within two
          working days.
        </p>

        <dl className={styles.facts}>
          <div>
            <dt>Open to</dt>
            <dd>Freelance projects, full-time engineering roles and UI consultations</dd>
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
      </div>

      <form className={styles.form} onSubmit={submit}>
        <div className={styles.row}>
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
            rows={6}
            value={form.message}
            onChange={update('message')}
            placeholder="What it does, who uses it, your timeline and budget"
          />
        </label>

        <button type="submit" className={`btn btn--primary ${styles.submit}`}>
          Send message <HiArrowRight aria-hidden="true" />
        </button>

        <p className={styles.note} role="status">
          {opened
            ? 'Your email app should now be open with the message written. Press send there to finish.'
            : 'Sending opens your email app with the message ready to send.'}
        </p>
      </form>
    </div>
  );
};

export default Contact;
