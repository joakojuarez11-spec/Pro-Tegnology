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