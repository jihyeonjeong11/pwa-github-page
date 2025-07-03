import { useEffect, useState } from 'react';
// returntype
const DEFAULT_LOCALE = 'ko-KR';

const DEFAULT_INTL_CONFIG = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
} as Intl.DateTimeFormatOptions;

const SECOND_IN_MILLISECONDS = 1000;

function Clock() {
  const [time, setTime] = useState(
    new Intl.DateTimeFormat(DEFAULT_LOCALE, DEFAULT_INTL_CONFIG).format(
      new Date()
    )
  );
  const updateTime = () => {
    const now = new Date();
    const formattedTime = new Intl.DateTimeFormat(
      DEFAULT_LOCALE,
      DEFAULT_INTL_CONFIG
    ).format(now);
    setTime(formattedTime);
  };
  useEffect(() => {
    const interval = setInterval(updateTime, SECOND_IN_MILLISECONDS * 60);
    return () => clearInterval(interval);
  }, []);

  return <div className="px-2 text-xs">{time}</div>;
}

export default Clock;
