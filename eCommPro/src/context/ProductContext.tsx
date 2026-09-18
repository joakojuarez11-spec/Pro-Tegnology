/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as productoService from '../services/productoService';
import type { Producto, Categoria } from '../services/productoService';

export type { Producto, Categoria };

interface ProductosContextType {
  productos: Producto[];
  categorias: Categoria[];
  loading: boolean;
  getById: (id: string) => Producto | undefined;
  getByCategory: (slug: string) => Producto[];
  getDestacados: () => Producto[];
  search: (query: string) => Producto[];
  addProduct: (product: Omit<Producto, 'id'>) => Producto;
  updateProduct: (id: number, data: Partial<Producto>) => void;
  deleteProduct: (id: number) => void;
  refreshProductos: () => void;
}

const ProductosContext = createContext<ProductosContextType | null>(null);

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductosProvider');
  }
  return context;
};