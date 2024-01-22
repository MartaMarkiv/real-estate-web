export const sortDialogs = data => {
  return [
    ...data.filter(item => item.hasNotification >0 ).sort((a, b) => b.lastTime - a.lastTime),
    ...data.filter(item => item.hasNotification <= 0).sort((a, b) => b.lastTime - a.lastTime)
  ];
};