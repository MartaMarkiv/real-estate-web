export const parser = data => {
  const ids = data.map(item => item.telegram_id);
  const uniqueIds = Array.from(new Set(ids));
  return uniqueIds.map(idItem => {
    const messages = data.filter(item => item.telegram_id === idItem);
    const newestData = messages[messages.length -1];
    return {
      userId: idItem,
      messages,
      hasNotification: data.filter(item => item.is_alert === 1 && item.telegram_id === idItem).length,
      userName: newestData.name_surname
    };
  });
};