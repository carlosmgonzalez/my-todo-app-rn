export const formatDate = (date: Date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate().toString().padStart(2, "0"); // Asegura que el día tenga dos dígitos
  const month = months[date.getMonth()];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day} ${month}, ${dayOfWeek}`;
};

export const formatTime = (date: Date) => {
  return date.toLocaleString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
