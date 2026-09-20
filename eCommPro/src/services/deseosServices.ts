const getDeseosKey = (userId: number): string => `deseos_${userId}`;

export const getDeseos = (userId: number): number[] => {
  const key = getDeseosKey(userId);
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const addDeseo = (userId: number, productId: number): void => {
  const key = getDeseosKey(userId);
  const deseos = getDeseos(userId);
  if (!deseos.includes(productId)) {
    deseos.push(productId);
    localStorage.setItem(key, JSON.stringify(deseos));
  }
};

export const removeDeseo = (userId: number, productId: number): void => {
  const key = getDeseosKey(userId);
  const deseos = getDeseos(userId).filter(id => id !== productId);
  localStorage.setItem(key, JSON.stringify(deseos));
};

export const isInDeseos = (userId: number, productId: number): boolean => {
  const deseos = getDeseos(userId);
  return deseos.includes(productId);
};