import fondoHero from '../assets/fondo-hero.jpg';

export const HeroBanner = () => {
  return (
    <div className="hero-section">
      <div className="hero-banner" style={{ backgroundImage: `url(${fondoHero})` }}>
      </div>
    </div>
  );
};