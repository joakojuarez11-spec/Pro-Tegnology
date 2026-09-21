/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import * as carritoService from '../services/carritoService';
import * as productoService from '../services/productoServices';
import { useProductos } from './ProductContext';
import type { Producto } from './ProductContext';
import type { CarritoItem } from '../services/carritoService';

interface CarritoContextType {
  items: CarritoItem[];
  total: number;
  itemCount: number;
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  clear: () => void;
}

const CarritoContext = createContext<CarritoContextType | null>(null);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const { refreshProductos } = useProductos();

  const updateTotals = (currentItems: CarritoItem[]) => {
    setTotal(carritoService.getTotal());
    setItemCount(currentItems.reduce((sum, i) => sum + i.cantidad, 0));
  };

  useEffect(() => {
    const loadedItems = carritoService.getItems();
    setItems(loadedItems);
    updateTotals(loadedItems);
  }, []);

  const addItem = (producto: Producto, cantidad = 1) => {
    const updated = carritoService.addItem(producto, cantidad);
    setItems(updated);
    updateTotals(updated);
    productoService.updateStock(producto.id, -cantidad);
    refreshProductos();
    toast.success(`${producto.name} agregado al carrito`);
  };

  const removeItem = (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      productoService.updateStock(id, item.cantidad);
    }
    const updated = carritoService.removeItem(id);
    setItems(updated);
    updateTotals(updated);
    refreshProductos();
  };

  const updateQuantity = (id: number, cantidad: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const diff = item.cantidad - cantidad;
      productoService.updateStock(id, diff);
    }
    const updated = carritoService.updateQuantity(id, cantidad);
    setItems(updated);
    updateTotals(updated);
    refreshProductos();
  };

  const clear = () => {
    items.forEach(item => {
      productoService.updateStock(item.id, item.cantidad);
    });
    const updated = carritoService.clear();
    setItems(updated);
    updateTotals(updated);
    refreshProductos();
  };

  return (
    <CarritoContext.Provider value={{ items, total, itemCount, addItem, removeItem, updateQuantity, clear }}>
      {children}
    </CarritoContext.Provider>
  );
};
