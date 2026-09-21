import { Link } from 'react-router-dom';
import { Mail, Phone, Clock } from 'lucide-react';
import logoImg from '../assets/logo-footer.png';
import nameImg from '../assets/name.png';

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-card">
          <div className="footer-glow"></div>
          <div className="footer-logo-bg">
            <img src={logoImg} alt="Pro Technology" className="footer-logo-bg-img" />
          </div>

          <div className="footer-grid">
            <div>
              <img src={nameImg} alt="Pro Technology" className="footer-name-img" />
              <p className="footer-brand-desc">
                Innovación, calidad y la mejor tecnología en un solo lugar.
              </p>
              <div className="footer-social">
                <Link to="/redes/instagram" className="footer-social-link">
                  <InstagramIcon />
                </Link>
                <Link to="/redes/facebook" className="footer-social-link">
                  <FacebookIcon />
                </Link>
                <Link to="/redes/x" className="footer-social-link">
                  <XIcon />
                </Link>
                <Link to="/redes/github" className="footer-social-link">
                  <GitHubIcon />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="footer-section-title">Enlaces rápidos</h4>
              <ul className="footer-links">
                <li><Link to="/" className="footer-link">Inicio</Link></li>
                <li><Link to="/about" className="footer-link">Nosotros</Link></li>
                <li><Link to="/cuenta" className="footer-link">Mi cuenta</Link></li>
              </ul>
            </div>

            <div className="footer-cats-section">
              <h4 className="footer-section-title">Categorías</h4>
              <ul className="footer-links">
                <li><Link to="/categoria/laptops" className="footer-link">Laptops</Link></li>
                <li><Link to="/categoria/pc-gamer" className="footer-link">PC Gamer</Link></li>
                <li><Link to="/categoria/celulares" className="footer-link">Celulares</Link></li>
                <li><Link to="/categoria/accesorios" className="footer-link">Accesorios</Link></li>
                <li><Link to="/categoria/componentes" className="footer-link">Componentes</Link></li>
                <li><Link to="/categoria/perifericos" className="footer-link">Periféricos</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-section-title">Contacto</h4>
              <ul className="footer-contact">
                <li className="footer-contact-item">
                  <Mail size={14} className="footer-contact-icon" />
                  <a href="mailto:info@protechnology.com" className="footer-contact-link">info@protechnology.com</a>
                </li>
                <li className="footer-contact-item">
                  <Phone size={14} className="footer-contact-icon" />
                  <a href="tel:+541112345678" className="footer-contact-link">+54 11 1234 5678</a>
                </li>
                <li className="footer-contact-item start">
                  <Clock size={14} className="footer-contact-icon" />
                  <span>Lunes a Viernes<br />9:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              © 2026 Pro Technology. Todos los derechos reservados.
            </div>
            <div className="footer-bottom-brand">
              Hecho por <span className="footer-bottom-heart">Pro-Technology</span> en Argentina
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
