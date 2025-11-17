import { useEffect, useState } from "react";

export function Time() {
  const [time, setTime] = useState(getFormattedTime);

  useEffect(() => {
    // Update immediately at mount, then every minute
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 60000); // 60,000 ms = 1 minute

    // Cleanup when component unmounts
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

function getFormattedTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const meridiem = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutesStr} ${meridiem}`;
}
