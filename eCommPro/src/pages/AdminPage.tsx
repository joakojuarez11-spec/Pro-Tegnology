import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProductos } from '../context/ProductosContext';
import type { Producto } from '../context/ProductosContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Modal } from '../components/Modal';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, Users, Package } from 'lucide-react';
import * as authService from '../services/authService';

interface ProductoFormData {
  name: string;
  price: string;
  category: string;
  categoryLabel: string;
  image: string;
  description: string;
  stock: string;
}

export const AdminPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminContent />
    </ProtectedRoute>
  );
};
