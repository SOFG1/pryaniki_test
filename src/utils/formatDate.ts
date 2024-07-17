export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  console.log(date);
  console.log(dateStr);
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric"
  });
};
