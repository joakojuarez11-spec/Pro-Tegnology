
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h1>Página no encontrada</h1>
      <p>La página que buscás no existe o fue movida</p>
      <Link to="/" className="btn btn-primary">
        <Home size={16} /> Volver al inicio
      </Link>
    </div>
  );
};
