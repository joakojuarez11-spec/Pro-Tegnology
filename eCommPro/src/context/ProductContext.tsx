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


export const ProductosProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = productoService.getAll();
    const cats = productoService.getCategories();
    setProductos(loaded);
    setCategorias(cats);
    setLoading(false);
  }, []);

  const getById = (id: string) => {
    return productoService.getById(id);
  };

  const getByCategory = (slug: string) => {
    return productoService.getByCategory(slug);
  };

  const getDestacados = () => {
    return productoService.getDestacados();
  };

  const search = (query: string) => {
    return productoService.search(query);
  };

  const addProduct = (product: Omit<Producto, 'id'>) => {
    const newProduct = productoService.addProduct(product);
    setProductos(productoService.getAll());
    return newProduct;
  };

  const updateProduct = (id: number, data: Partial<Producto>) => {
    productoService.updateProduct(id, data);
    setProductos(productoService.getAll());
  };

  const deleteProduct = (id: number) => {
    productoService.deleteProduct(id);
    setProductos(productoService.getAll());
  };

  const refreshProductos = () => {
    setProductos(productoService.getAll());
  };

  return (
    <ProductosContext.Provider value={{ productos, categorias, loading, getById, getByCategory, getDestacados, search, addProduct, updateProduct, deleteProduct, refreshProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};
