export const saveItem = (key: string, data: any) => {
  const serializedState = JSON.stringify(data);
  localStorage.setItem(key, serializedState);
};

export const getItem = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const deleteItem = (key: string) => localStorage.removeItem(key);

export const clearStorage = () => localStorage.clear();
