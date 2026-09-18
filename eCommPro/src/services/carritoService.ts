const STORAGE_KEY = 'carrito';

interface Producto {
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  imageBg: string;
}

export interface CarritoItem {
  id: number;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
  imageBg: string;
  cantidad: number;
}

export const getItems = (): CarritoItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addItem = (producto: Producto, cantidad: number = 1): CarritoItem[] => {
  const items = getItems();
  const existing = items.find(i => i.id === producto.id);

  if (existing) {
    existing.cantidad += cantidad;
  } else {
    items.push({
      id: producto.id,
      name: producto.name,
      category: producto.categoryLabel,
      price: producto.price,
      priceFormatted: producto.priceFormatted,
      imageBg: producto.imageBg,
      cantidad
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items;
};

export const removeItem = (id: number): CarritoItem[] => {
  const items = getItems().filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items;
};

export const updateQuantity = (id: number, cantidad: number): CarritoItem[] => {
  const items = getItems();
  const item = items.find(i => i.id === id);
  if (item) {
    item.cantidad = Math.max(1, cantidad);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  return items;
};

export const clear = (): CarritoItem[] => {
  localStorage.removeItem(STORAGE_KEY);
  return [];
};

export const getTotal = (): number => {
  const items = getItems();
  return items.reduce((sum, i) => sum + i.price * i.cantidad, 0);
};

export const getItemCount = (): number => {
  const items = getItems();
  return items.reduce((sum, i) => sum + i.cantidad, 0);
};
