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
              Setup al siguiente <br />
              Nivel
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};