import { useState, useEffect } from "react";

function DateTime() {
  const [formattedDateTime, setFormattedDateTime] = useState({
    dateFormat: "",
    timeFormat: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
      };

      const formattedDate = now.toLocaleDateString("en-US", dateOptions);

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

      // const dateString = formattedDate;
      // const timeString = formattedTime;

      setFormattedDateTime({
        dateFormat: formattedDate,
        timeFormat: formattedTime,
      });
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p
      style={{
        color: "var(--secondary)",
        fontSize: "var(--size-small)",
        width: "200px",
        textAlign: "center",
        display: "flex",
        textWrap: "nowrap",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          width: "50%",
          display: "inline-block",
        }}
      >
        {formattedDateTime.dateFormat}
      </span>
      <span style={{ width: "50%", display: "inline-block" }}>
        {formattedDateTime.timeFormat}
      </span>
    </p>
  );
}

export default DateTime;
