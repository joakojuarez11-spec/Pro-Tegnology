import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCarrito } from '../context/carritocontext';
import { useProductos } from '../context/ProductContext';
import type { Producto } from '../context/ProductContext';

export const ProductsSection: React.FC = () => {
  const { addItem } = useCarrito();
  const { productos } = useProductos();
  const featured = productos.filter(p => p.destacado);

  return (
    <section className="products-section">
      <div className="products-header">
        <div>
          <span className="products-subtitle">Destacados de la semana</span>
          <h2 className="products-title">Productos Tecnológicos</h2>
        </div>
        <Link to="/categoria/productos" className="products-header-link">
          Ver todos →
        </Link>
      </div>

      <div className="products-grid">
        {featured.map((product: Producto) => (
          <div 
            key={product.id} 
            className="product-card"
          >
            <div>
              <div className={`product-card-image ${product.imageBg}`}>
                {product.image && (
                  <>
                    <img src={product.image} alt="" className="product-card-img-bg" aria-hidden="true" />
                    <img src={product.image} alt={product.name} className="product-card-img" />
                  </>
                )}
                <div className="product-card-badge">
                  Nuevo
                </div>
              </div>
              <div className="product-card-info">
                <span className="product-card-category">{product.categoryLabel}</span>
                <h3 className="product-card-name">
                  {product.name}
                </h3>
                <div className="product-card-price">
                  {product.priceFormatted}
                </div>
              </div>
            </div>

            <div className="product-card-actions">
              <Link 
                to={`/producto/${product.id}`}
                className="product-card-btn product-card-btn-view"
              >
                <Eye size={14} /> Ver
              </Link>
              <button 
                className="product-card-btn product-card-btn-buy"
                onClick={() => addItem(product)}
              >
                <ShoppingCart size={14} /> Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};