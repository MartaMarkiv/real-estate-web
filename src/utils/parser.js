export const parser = data => {
  const ids = data.map(item => item.telegram_id);
  const uniqueIds = Array.from(new Set(ids));
  return uniqueIds.map(idItem => {
    return {
      userId: idItem,
      messages: data.filter(dataItem => dataItem.telegram_id === idItem),
      hasNotification: data.filter(item => item.is_alert === 1 && item.telegram_id === idItem).length
    };
  });
};