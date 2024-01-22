const dataToString = d => d >= 10 ? d : `0${d}`;

export const parseDate = (pastTime) => {
  const day = new Date(pastTime).getDate();
  const month = new Date(pastTime).getMonth();
  const hour = new Date(pastTime).getHours();
  const min = new Date(pastTime).getMinutes();
  return {
    date: `${dataToString(day)}.${dataToString(month + 1)}`,
    time: `${dataToString(hour)}:${dataToString(min)}`
  };
}