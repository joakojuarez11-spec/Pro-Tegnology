
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useDeseos } from '../context/DeseosContext';
import { useProductos } from '../context/ProductosContext';
import type { Producto } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

export const ListaDeseosPage = () => {
  const { deseos } = useDeseos();
  const { getById } = useProductos();
  const { addItem } = useCarrito();
  const { isLoggedIn } = useAuth();

  const productos = deseos.map(id => getById(String(id))).filter(Boolean) as Producto[];

  if (!isLoggedIn) {
    return (
      <div className="page">
        <div className="carrito-empty">
          <Heart size={64} className="carrito-empty-icon" />
          <h2>Iniciá sesión para ver tu lista de deseos</h2>
          <p>Guardá productos que te gusten para comprarlos después</p>
          <Link to="/cuenta" className="btn btn-primary">Iniciar sesión</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header-badge">Mis favoritos</span>
        <h1 className="page-title">Lista de deseos</h1>
        <p className="page-subtitle">Tus productos guardados para comprar después</p>
      </div>

      {productos.length === 0 ? (
        <div className="carrito-empty">
          <Heart size={64} className="carrito-empty-icon" />
          <h2>Tu lista de deseos está vacía</h2>
          <p>Guardá productos que te gusten para comprarlos después</p>
          <Link to="/" className="btn btn-primary">Explorar productos</Link>
        </div>
      ) : (
        <div className="deseos-grid">
          {productos.map((product) => (
            <div key={product.id} className="product-card">
              <div>
                <div className={`product-card-image ${product.imageBg}`}>
                  <span className="product-card-category-icon">[ {product.categoryLabel} ]</span>
                </div>
                <div className="product-card-info">
                  <span className="product-card-category">{product.categoryLabel}</span>
                  <h3 className="product-card-name">{product.name}</h3>
                  <div className="product-card-price">{product.priceFormatted}</div>
                </div>
              </div>
              <div className="product-card-actions">
                <Link to={`/producto/${product.id}`} className="product-card-btn product-card-btn-view">
                  <Eye size={14} /> Ver
                </Link>
                <button onClick={() => addItem(product)} className="product-card-btn product-card-btn-buy">
                  <ShoppingCart size={14} /> Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};