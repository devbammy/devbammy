import { useEffect, useState } from 'react';

const format = (timeZone) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(
    new Date(),
  );

// Live clock for a time zone, so visitors know when they'll hear back.
const LocalTime = ({ timeZone }) => {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 15000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <time>{time}</time>;
};

export default LocalTime;
