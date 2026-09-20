import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import type { Producto } from '../context/ProductosContext';

export const ProductsSection: React.FC = () => {
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
          </div>
        ))}
      </div>
    </section>
  );
};