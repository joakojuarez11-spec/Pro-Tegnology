
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

export const CarritoPage = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clear } = useCarrito();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="carrito-empty">
          <ShoppingCart size={64} className="carrito-empty-icon" />
          <h2>Tu carrito está vacío</h2>
          <p>Agregá productos para comenzar tu compra</p>
          <Link to="/" className="btn btn-primary">Explorar productos</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (num: number) => {
    return '$' + num.toLocaleString('es-AR');
  };

  return (
    <div className="carrito-page">
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Seguir comprando
      </button>

      <h1 className="page-title">Carrito de compras</h1>

      <div className="carrito-grid">
        <div className="carrito-items">
          {items.map((item) => (
            <div key={item.id} className="carrito-item">
              <div className={`carrito-item-image ${item.imageBg}`}>
                <span className="product-card-category-icon">[ {item.category} ]</span>
              </div>
              <div className="carrito-item-info">
                <div className="carrito-item-name">{item.name}</div>
                <div className="carrito-item-category">{item.category}</div>
                <div className="carrito-item-price">{item.priceFormatted}</div>
              </div>
              <div className="carrito-item-qty">
                <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} className="carrito-item-qty-btn">
                  <Minus size={14} />
                </button>
                <span className="carrito-item-qty-value">{item.cantidad}</span>
                <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} className="carrito-item-qty-btn">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => removeItem(item.id)} className="carrito-item-remove">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button onClick={clear} className="btn btn-secondary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
            Vaciar carrito
          </button>
        </div>

        <div className="carrito-summary">
          <h3 className="carrito-summary-title">Resumen de compra</h3>
          <div className="carrito-summary-row">
            <span>Productos ({itemCount})</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="carrito-summary-row">
            <span>Envío</span>
            <span style={{ color: 'var(--cyan-400)' }}>Gratis</span>
          </div>
          <div className="carrito-summary-total">
            <span>Total</span>
            <span className="price">{formatPrice(total)}</span>
          </div>
          <button className="btn btn-pink" style={{ width: '100%', marginTop: '16px' }}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};
