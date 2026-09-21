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