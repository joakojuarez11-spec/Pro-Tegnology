import { Link } from 'react-router-dom';
import fondoHero from '../assets/fondo-hero.jpg';

export const HeroBanner = () => {
  return (
    <div className="hero-section">
      <div className="hero-banner" style={{ backgroundImage: `url(${fondoHero})` }}>
        {/* Main Content */}
        <div className="hero-main">
          {/* Content Left */}
          <div className="hero-content">
            <span className="hero-badge">
              GAMING SIN LÍMITES
            </span>
            <h1 className="hero-title">
              Llevá tu <br />
              <span className="hero-title-gradient">Setup al siguiente</span> <br />
              <span className="hero-title-pink">Nivel</span>
            </h1>
            <p className="hero-description">
              Las mejores marcas, los mejores precios y todo en tecnología en un solo lugar.
            </p>
            <Link 
              to="/categoria/productos" 
              className="hero-btn"
            >
              Ver productos <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};