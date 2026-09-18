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

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState<'productos' | 'usuarios'>('productos');

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header-badge">Panel de administración</span>
        <h1 className="page-title">Admin</h1>
        <p className="page-subtitle">Gestioná productos y usuarios del sistema</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => setActiveTab('productos')}
        >
          <Package size={16} /> Productos
        </button>
        <button
          className={`admin-tab ${activeTab === 'usuarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('usuarios')}
        >
          <Users size={16} /> Usuarios
        </button>
      </div>

      {activeTab === 'productos' ? <ProductosTab /> : <UsuariosTab />}
    </div>
  );
};