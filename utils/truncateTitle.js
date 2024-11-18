export const truncateTitle = (
  title = "",
  maxLength = 23,
  truncateLength = 20
) => {
  if (typeof title !== "string") {
    console.error("Invalid title type. Expected a string.");
    return "";
  }

  if (title.length > maxLength) {
    return `...${title.slice(0, truncateLength)}`;
  }
  return title;
};
