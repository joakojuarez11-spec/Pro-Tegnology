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

const ProductosTab = () => {
  const { productos, addProduct, updateProduct, deleteProduct } = useProductos();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductoFormData>();

  const categories = [
    { slug: 'laptops', label: 'Laptops' },
    { slug: 'pc-gamer', label: 'PC Gamer' },
    { slug: 'celulares', label: 'Celulares' },
    { slug: 'accesorios', label: 'Accesorios' },
    { slug: 'componentes', label: 'Componentes' },
    { slug: 'perifericos', label: 'Periféricos' },
    { slug: 'gaming', label: 'Gaming' }
  ];

  const openCreateModal = () => {
    setEditingProduct(null);
    reset({ name: '', price: '', category: 'laptops', categoryLabel: 'Laptops', image: '', description: '', stock: '' });
    setModalOpen(true);
  };

  const openEditModal = (product: Producto) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      price: String(product.price),
      category: product.category,
      categoryLabel: product.categoryLabel,
      image: product.image || '',
      description: product.description,
      stock: String(product.stock)
    });
    setModalOpen(true);
  };

  const onSubmit = (data: ProductoFormData) => {
    const productData = {
      name: data.name,
      price: Number(data.price),
      priceFormatted: `$${Number(data.price).toLocaleString('es-CL')}`,
      category: data.category,
      categoryLabel: categories.find(c => c.slug === data.category)?.label || data.category,
      image: data.image,
      imageBg: 'cyan-blue',
      description: data.description,
      specs: [],
      destacado: false,
      oferta: false,
      brand: 'N/A',
      discount: 0,
      badgeType: 'new',
      rating: 0,
      reviews: 0,
      stock: Number(data.stock)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setModalOpen(false);
    reset();
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`¿Eliminar "${name}"?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Inventario de productos</h2>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <Plus size={16} /> Agregar producto
        </button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.priceFormatted}</td>
                <td>{product.categoryLabel}</td>
                <td>
                  <span className={`stock-badge ${product.stock <= 5 ? 'low' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="admin-actions">
                  <button className="admin-btn-edit" onClick={() => openEditModal(product)}>
                    <Edit size={14} /> Editar
                  </button>
                  <button className="admin-btn-delete" onClick={() => handleDelete(product.id, product.name)}>
                    <Trash2 size={14} /> Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Editar producto' : 'Agregar producto'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
          <div className="form-group">
            <label className="form-label">Nombre *</label>
            <input
              {...register('name', { required: 'El nombre es requerido' })}
              type="text"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Nombre del producto"
            />
            {errors.name && <span className="form-error">{(errors.name as { message?: string }).message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Precio *</label>
              <input
                {...register('price', { required: 'El precio es requerido', min: { value: 1, message: 'Debe ser mayor a 0' } })}
                type="number"
                className={`form-input ${errors.price ? 'error' : ''}`}
                placeholder="0"
              />
              {errors.price && <span className="form-error">{(errors.price as { message?: string }).message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Stock *</label>
              <input
                {...register('stock', { required: 'El stock es requerido', min: { value: 0, message: 'No puede ser negativo' } })}
                type="number"
                className={`form-input ${errors.stock ? 'error' : ''}`}
                placeholder="0"
              />
              {errors.stock && <span className="form-error">{(errors.stock as { message?: string }).message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Categoría *</label>
            <select
              {...register('category', { required: 'La categoría es requerida' })}
              className={`form-input ${errors.category ? 'error' : ''}`}
            >
              {categories.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.label}</option>
              ))}
            </select>
            {errors.category && <span className="form-error">{(errors.category as { message?: string }).message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">URL de imagen</label>
            <input
              {...register('image')}
              type="text"
              className="form-input"
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción *</label>
            <textarea
              {...register('description', { required: 'La descripción es requerida' })}
              className={`form-input ${errors.description ? 'error' : ''}`}
              rows={3}
              placeholder="Descripción del producto"
            />
            {errors.description && <span className="form-error">{(errors.description as { message?: string }).message}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingProduct ? 'Guardar cambios' : 'Agregar producto'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const UsuariosTab = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState(authService.getAllUsers());

  const handleDelete = (id: number, nombre: string) => {
    if (id === currentUser?.id) {
      alert('No podés eliminarte a vos mismo');
      return;
    }
    if (window.confirm(`¿Eliminar al usuario "${nombre}"?`)) {
      authService.deleteUser(id);
      setUsers(authService.getAllUsers());
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Usuarios registrados</h2>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: { id: number; nombre: string; email: string; role: string }) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge ${u.role === 'admin' ? 'admin' : 'user'}`}>
                    {u.role === 'admin' ? 'Administrador' : 'Usuario'}
                  </span>
                </td>
                <td className="admin-actions">
                  <button
                    className="admin-btn-delete"
                    onClick={() => handleDelete(u.id, u.nombre)}
                    disabled={u.id === currentUser?.id}
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};