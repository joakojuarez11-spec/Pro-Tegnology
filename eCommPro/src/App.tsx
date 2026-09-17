import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CategoriaPage } from './pages/CategoriaPage';
import { ProductoDetallePage } from './pages/ProductoDetallePage';
import { CarritoPage } from './pages/CarritoPage';
import { CuentaPage } from './pages/CuentaPage';
import { ListaDeseosPage } from './pages/ListaDeseosPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Router>
      { <ScrollToTop /> }
      <div className="min-h-screen bg-primary flex flex-col">
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categoria/:slug" element={<CategoriaPage />} />
            <Route path="/producto/:id" element={<ProductoDetallePage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/cuenta" element={<CuentaPage />} />
            <Route path="/lista-de-deseos" element={<ListaDeseosPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;