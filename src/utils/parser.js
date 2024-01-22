import { sortDialogs } from "./sortDialogs";
import { transformData } from "./transformData";
import { parseDate } from "./parseDate";

export const parser = data => {
  const list = data.map(item => Object.assign(item, parseDate(item.create_date)));
  const ids = list.map(item => item.telegram_id);
  const uniqueIds = Array.from(new Set(ids));
  const allDialogs = uniqueIds.map(idItem => {
    const messages = data.filter(item => item.telegram_id === idItem);
    const newestData = messages[messages.length -1];
    const date = transformData(newestData.create_date);
    return {
      userId: idItem,
      messages,
      hasNotification: data.filter(item => item.is_alert === 1 && item.telegram_id === idItem).length,
      userName: newestData.name_surname,
      lastTime: new Date(newestData.create_date).getTime(),
      date
    };
  });
  return sortDialogs(allDialogs);
};