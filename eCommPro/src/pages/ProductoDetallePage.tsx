
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { useProductos } from '../context/ProductContext';
import { useCarrito } from '../context/carritocontext';
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

  const inDeseos = isInDeseos(producto.id);

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Volver
      </button>

      <div className="product-detail-grid">
        <div
          className={`product-detail-image ${producto.imageBg}`}
          style={producto.image ? { backgroundImage: `url(${producto.image})` } : undefined}
        >
          <span className="product-card-category-icon">[ {producto.categoryLabel} ]</span>
        </div>

        <div className="product-detail-info">
          <span className="product-card-category">{producto.categoryLabel}</span>
          <h1>{producto.name}</h1>
          <div className="product-detail-price">{producto.priceFormatted}</div>

          <div className="product-detail-stock">
            <span className={`stock-label ${producto.stock === 0 ? 'out' : producto.stock <= 5 ? 'low' : ''}`}>
              {producto.stock === 0 ? 'Agotado' : `Stock disponible: ${producto.stock} unidades`}
            </span>
          </div>

          <p className="product-detail-desc">{producto.description}</p>

          {producto.specs && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--cyan-400)' }}>Especificaciones:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {producto.specs.map((spec: string, i: number) => (
                  <li key={i} style={{ fontSize: '14px', color: 'var(--text-muted)', padding: '4px 0', borderBottom: '1px solid var(--border-cyan)' }}>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-detail-actions">
            <button 
              onClick={handleAddToCart} 
              className="btn btn-pink" 
              style={{ flex: 1 }}
              disabled={producto.stock === 0}
            >
              <ShoppingCart size={16} /> 
              {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
            <button
              onClick={handleToggleDeseo}
              className={`btn ${inDeseos ? 'btn-pink' : 'btn-secondary'}`}
              title={inDeseos ? 'Quitar de la lista de deseos' : 'Agregar a la lista de deseos'}
            >
              <Heart size={16} fill={inDeseos ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};