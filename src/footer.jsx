import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Parte superior */}
      <div className="footer-top">

        <div className="footer-brand">
          <h2>
            <span>TP</span> PRO TECHNOLOGY
          </h2>

          <p>
            Innovación, calidad y la mejor tecnología
            en un solo lugar.
          </p>

          <div className="footer-social">
            <a href="#">IG</a>
            <a href="#">FB</a>
            <a href="#">TT</a>
            <a href="#">X</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Enlaces rápidos</h3>
          <a href="/">Inicio</a>
          <a href="/productos">Productos</a>
          <a href="/ofertas">Ofertas</a>
          <a href="/contacto">Contacto</a>
          <a href="/nosotros">Sobre nosotros</a>
        </div>

        <div className="footer-column">
          <h3>Categorías</h3>
          <a href="/laptops">Laptops</a>
          <a href="/pc-gamer">PC Gamer</a>
          <a href="/celulares">Celulares</a>
          <a href="/accesorios">Accesorios</a>
          <a href="/perifericos">Periféricos</a>
        </div>

        <div className="footer-column">
          <h3>Ayuda</h3>
          <a href="/preguntas">Preguntas frecuentes</a>
          <a href="/envios">Envíos</a>
          <a href="/pagos">Medios de pago</a>
          <a href="/garantia">Garantías</a>
          <a href="/soporte">Soporte técnico</a>
        </div>

        <div className="footer-column contact">
          <h3>Contacto</h3>

          <p>📍 San Miguel de Tucumán</p>
          <p>📞 +54 381 123 4567</p>
          <p>✉️ info@protechnology.com</p>
          <p>🕐 Lun - Vie: 9:00 - 18:00</p>
        </div>

      </div>

     
      <div className="footer-bottom">

        <p>
          © 2026 Pro Technology. Todos los derechos reservados.
        </p>

        <div className="payment-methods">
          <span>VISA</span>
          <span>MC</span>
          <span>AMEX</span>
          <span>MP</span>
        </div>

        <div className="legal-links">
          <a href="/terminos">Términos</a>
          <a href="/privacidad">Privacidad</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;