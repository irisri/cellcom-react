export const saveToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key: string): any => {
  const res = localStorage.getItem(key);
  if (!res) return null;
  return JSON.parse(res);
};
