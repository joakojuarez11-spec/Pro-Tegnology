import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Monitor, Gamepad2, Smartphone, Cable, Cpu, Headphones, Gamepad } from 'lucide-react';
import { useProductos } from '../context/ProductContext';
import type { Producto } from '../context/ProductContext';
import { useCarrito } from '../context/carritocontext';

const categorias = [
  { slug: 'laptops', label: 'Laptops', icon: Monitor },
  { slug: 'pc-gamer', label: 'PC Gamer', icon: Gamepad2 },
  { slug: 'celulares', label: 'Celulares', icon: Smartphone },
  { slug: 'accesorios', label: 'Accesorios', icon: Cable },
  { slug: 'componentes', label: 'Componentes', icon: Cpu },
  { slug: 'perifericos', label: 'Periféricos', icon: Headphones },
  { slug: 'gaming', label: 'Gaming', icon: Gamepad },
];

const marcasFijas = ["Lenovo", "ASUS", "HP", "Acer", "MSI"];

export const CategoriaPage = () => {
  const { slug = '' } = useParams();
  const { getByCategory } = useProductos();
  const { addItem } = useCarrito();
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevantes');
  
  let productos: Producto[] = getByCategory(slug);
  
  // Filtrar por marcas
  if (selectedBrands.length > 0) {
    productos = productos.filter((p: Producto) => selectedBrands.includes(p.brand));
  }
  
  // Ordenar
  if (sortBy === 'precio-menor') {
    productos = [...productos].sort((a: Producto, b: Producto) => a.price - b.price);
  } else if (sortBy === 'precio-mayor') {
    productos = [...productos].sort((a: Producto, b: Producto) => b.price - a.price);
  } else if (sortBy === 'rating') {
    productos = [...productos].sort((a: Producto, b: Producto) => b.rating - a.rating);
  }

  const titulo = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const getBadgeClass = (product: Producto) => {
    if (product.badgeType === 'new') return 'badge-new';
    if (product.badgeType === 'offer') return 'badge-offer';
    return 'badge-discount';
  };

  const getBadgeText = (product: Producto) => {
    if (product.badgeType === 'new') return 'Nuevo';
    if (product.badgeType === 'offer') return 'Oferta';
    return `-${product.discount}%`;
  };

  return (
    <div className="category-page">
      {/* Sidebar */}
      <aside className="category-sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Categorías</h3>
          <nav className="sidebar-nav">
            {categorias.map(cat => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to={`/categoria/${cat.slug}`}
                  className={`sidebar-link ${slug === cat.slug ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-title">Filtrar por</h3>
          <h4 className="sidebar-subtitle">Marca</h4>
          <div className="filter-list">
            {marcasFijas.map(brand => (
              <label key={brand} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="category-main">
        <div className="category-top">
          <h1 className="category-main-title">{titulo}</h1>
          <div className="sort-wrapper">
            <span className="sort-label">Ordenar por:</span>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevantes">Más relevantes</option>
              <option value="precio-menor">Menor precio</option>
              <option value="precio-mayor">Mayor precio</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>
        </div>

        {productos.length === 0 ? (
          <div className="carrito-empty">
            <h2>No hay productos en esta categoría</h2>
            <p>Explorá otras categorías o volvé al inicio</p>
            <Link to="/" className="btn btn-primary">Volver al inicio</Link>
          </div>
        ) : (
          <div className="category-products-grid">
            {productos.map((product: Producto) => (
              <div key={product.id} className="category-product-card">
                <div className={`category-product-image ${product.imageBg}`}>
                  {product.image && (
                    <>
                      <img src={product.image} alt="" className="category-product-img-bg" aria-hidden="true" />
                      <img src={product.image} alt={product.name} className="category-product-img" />
                    </>
                  )}
                  <div className={`category-product-badge ${getBadgeClass(product)}`}>
                    {getBadgeText(product)}
                  </div>
                </div>
                <div className="category-product-info">
                  <h3 className="category-product-name">{product.name}</h3>
                  <div className="category-product-price">{product.priceFormatted}</div>
                  <div className="category-product-stock">
                    <span className={`stock-label ${product.stock === 0 ? 'out' : product.stock <= 5 ? 'low' : ''}`}>
                      {product.stock === 0 ? 'Agotado' : `Stock: ${product.stock}`}
                    </span>
                  </div>
                  <div className="category-product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} />
                      ))}
                    </div>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className="category-product-btn-buy"
                    disabled={product.stock === 0}
                    style={product.stock === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                  >
                    <ShoppingCart size={14} />
                    {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};