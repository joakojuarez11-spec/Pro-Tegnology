
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useDeseos } from '../context/DeseosContext';
import { useAuth } from '../context/AuthContext';

export const ProductoDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById } = useProductos();
  const { addItem } = useCarrito();
  const { addDeseo, removeDeseo, isInDeseos } = useDeseos();
  const { isLoggedIn } = useAuth();

  const producto = getById(id || '');

  if (!producto) {
    return (
      <div className="not-found">
        <div className="not-found-code">404</div>
        <h1>Producto no encontrado</h1>
        <p>El producto que buscás no existe</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(producto);
    navigate('/carrito');
  };

  const handleToggleDeseo = () => {
    if (!isLoggedIn) {
      navigate('/cuenta');
      return;
    }
    if (isInDeseos(producto.id)) {
      removeDeseo(producto.id);
    } else {
      addDeseo(producto.id);
    }
  };

  