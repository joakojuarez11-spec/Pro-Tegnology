import { Link } from 'react-router-dom';

export const ProductsSection: React.FC = () => {
  return (
    <section className="products-section">
      <div className="products-header">
        <div>
          <span className="products-subtitle">Destacados de la semana</span>
        </div>
        <Link to="/categoria/productos" className="products-header-link">
          Ver todos →
        </Link>
      </div>
    </section>
  );
};