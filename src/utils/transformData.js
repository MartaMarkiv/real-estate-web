const dataToString = d => d >= 10 ? d : `0${d}`;

export const transformData = (pastTime) => {
  const currentTime = new Date().getDate();
  const day = new Date(pastTime).getDate();
  const month = new Date(pastTime).getMonth();
  const hour = new Date(pastTime).getHours();
  const min = new Date(pastTime).getMinutes();
  return currentTime - day > 0 ? `${dataToString(day)}.${dataToString(month + 1)}` : `${dataToString(hour)}:${dataToString(min)}`;
}