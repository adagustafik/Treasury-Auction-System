export const dateConversionToString = (dateString: string): string => {
  const dateMsecs = Date.parse(dateString);
  const date = new Date(dateMsecs);
  return date.toLocaleTimeString([], {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const dateConversionToNumber = (dateString: string): number => {
  const dateMsecs = Date.parse(dateString);
  const date = new Date(dateMsecs);
  return date.getTime();
};
