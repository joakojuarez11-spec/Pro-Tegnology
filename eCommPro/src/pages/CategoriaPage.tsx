import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Monitor, Gamepad2, Smartphone, Cable, Cpu, Headphones, Gamepad } from 'lucide-react';
import { useProductos } from '../context/ProductosContext';
import type { Producto } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';

const categorias = [
  { slug: 'laptops', label: 'Laptops', icon: Monitor },
  { slug: 'pc-gamer', label: 'PC Gamer', icon: Gamepad2 },
  { slug: 'celulares', label: 'Celulares', icon: Smartphone },
  { slug: 'accesorios', label: 'Accesorios', icon: Cable },
  { slug: 'componentes', label: 'Componentes', icon: Cpu },
  { slug: 'perifericos', label: 'Periféricos', icon: Headphones },
  { slug: 'gaming', label: 'Gaming', icon: Gamepad },
];

const marcasFijas = ["Lenovo", "ASUS", "HP", "Acer", "MSI"];

export const CategoriaPage = () => {
  const { slug = '' } = useParams();
  const { getByCategory } = useProductos();
  const { addItem } = useCarrito();
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevantes');
  
  let productos: Producto[] = getByCategory(slug);
  
  // Filtrar por marcas
  if (selectedBrands.length > 0) {
    productos = productos.filter((p: Producto) => selectedBrands.includes(p.brand));
  }
  
  // Ordenar
  if (sortBy === 'precio-menor') {
    productos = [...productos].sort((a: Producto, b: Producto) => a.price - b.price);
  } else if (sortBy === 'precio-mayor') {
    productos = [...productos].sort((a: Producto, b: Producto) => b.price - a.price);
  } else if (sortBy === 'rating') {
    productos = [...productos].sort((a: Producto, b: Producto) => b.rating - a.rating);
  }