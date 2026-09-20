import { Link } from 'react-router-dom';

export const ProductsSection: React.FC = () => {
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
      </div>
    </section>
  );
};