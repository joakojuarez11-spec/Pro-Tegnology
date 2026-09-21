import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as carritoService from '../services/carritoService';

interface CarritoContextType {
  items: any[];
  total: number;
  itemCount: number;
  addItem: (producto: any, cantidad?: number) => void;
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
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const loadedItems = carritoService.getItems();
    setItems(loadedItems);
    updateTotals(loadedItems);
  }, []);

  const updateTotals = (currentItems: any[]) => {
    setTotal(carritoService.getTotal());
    setItemCount(currentItems.reduce((sum: number, i: any) => sum + i.cantidad, 0));
  };

  const addItem = (producto: any, cantidad = 1) => {
    const updated = carritoService.addItem(producto, cantidad);
    setItems(updated);
    updateTotals(updated);
  };

  const removeItem = (id: number) => {
    const updated = carritoService.removeItem(id);
    setItems(updated);
    updateTotals(updated);
  };