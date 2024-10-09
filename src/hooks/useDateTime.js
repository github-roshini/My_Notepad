import { useState, useEffect } from "react";

const useDateTime = () => {
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Date formatting
      const day = now.getDate();
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      // Time formatting
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 24-hour to 12-hour
      const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

      setDateTime({
        date: formattedDate,
        time: formattedTime,
      });
    };

    updateDateTime(); // Initialize the date/time when component mounts
    const intervalId = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return dateTime;
};

export default useDateTime;