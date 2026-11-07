import { useEffect, useState } from 'react';
import { HiOutlineCheck, HiOutlineSquare2Stack } from 'react-icons/hi2';
import { site } from '../../../assets/data/site';

// Copies the email address; falls back to opening the mail app if the clipboard is blocked.
const CopyEmail = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button type="button" className={`btn ${className}`} onClick={copy}>
      {copied ? <HiOutlineCheck aria-hidden="true" /> : <HiOutlineSquare2Stack aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
    </button>
  );
};

export default CopyEmail;
