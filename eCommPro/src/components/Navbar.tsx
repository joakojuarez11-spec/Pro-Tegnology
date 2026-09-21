import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Home, Menu, X, ChevronDown, ChevronUp, Shield, Info } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { useProductos } from '../context/ProductosContext';
import logoImg from '../assets/logo.png';
import nameImg from '../assets/name.png';
import fondoHero from '../assets/fondo-hero.jpg';

export const Navbar = () => {
  const { itemCount } = useCarrito();
  const { isAdmin } = useAuth();
  const { search } = useProductos();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileSearchResults, setMobileSearchResults] = useState<any[]>([]);
  const [showMobileResults, setShowMobileResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

  // Desktop search handler
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 0) {
      const results = search(value.trim());
      setSearchResults(results.slice(0, 8));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

   // Mobile search handler
  const handleMobileSearchChange = (value: string) => {
    setMobileSearchQuery(value);
    if (value.trim().length > 0) {
      const results = search(value.trim());
      setMobileSearchResults(results.slice(0, 8));
      setShowMobileResults(true);
    } else {
      setMobileSearchResults([]);
      setShowMobileResults(false);
    }
  };

  // Handle Enter key on desktop search
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      navigate(`/producto/${searchResults[0].id}`);
      setSearchQuery('');
      setShowResults(false);
      searchInputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setShowResults(false);
      searchInputRef.current?.blur();
    }
  };

  // Handle Enter key on mobile search
  const handleMobileSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && mobileSearchResults.length > 0) {
      navigate(`/producto/${mobileSearchResults[0].id}`);
      setMobileSearchQuery('');
      setShowMobileResults(false);
      setMenuOpen(false);
    }
    if (e.key === 'Escape') {
      setShowMobileResults(false);
    }
  };

  // Click result handler
  const handleResultClick = (productId: number) => {
    navigate(`/producto/${productId}`);
    setSearchQuery('');
    setMobileSearchQuery('');
    setShowResults(false);
    setShowMobileResults(false);
    setMenuOpen(false);
  };

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
      if (mobileSearchContainerRef.current && !mobileSearchContainerRef.current.contains(e.target as Node)) {
        setShowMobileResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close results on route change
  useEffect(() => {
    setShowResults(false);
    setShowMobileResults(false);
    setSearchQuery('');
    setMobileSearchQuery('');
  }, [location.pathname]);

  // Focus on search open (mobile)
  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
  }, [searchOpen]);

  return (
    <header className="navbar">
      {/* Top Bar */}
      <div className="navbar-top">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logoImg} alt="TP" className="navbar-logo-icon-img" />
          <img src={nameImg} alt="Pro Technology" className="navbar-logo-name-img" />
        </Link>

        {/* Search Bar Desktop */}
        <div className={`navbar-search ${searchOpen ? 'open' : ''}`} ref={searchContainerRef}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery.trim().length > 0 && setShowResults(true)}
            onKeyDown={handleSearchKeyDown}
          />
          <button
            className="navbar-search-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!searchOpen) setSearchOpen(true);
            }}
          >
            <Search size={16} />
          </button>

{/* Desktop Search Results Dropdown */}
          {showResults && (
            <div className="navbar-search-results">
              {searchResults.length === 0 ? (
                <div className="navbar-search-result-empty">
                  No se encontraron productos
                </div>
              ) : (
                <>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="navbar-search-result-item"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <div className={`navbar-search-result-image ${product.imageBg}`}>
                        {product.image && (
                          <img src={product.image} alt="" />
                        )}
                      </div>
                      <div className="navbar-search-result-info">
                        <span className="navbar-search-result-name">{product.name}</span>
                        <span className="navbar-search-result-category">{product.categoryLabel}</span>
                      </div>
                      <span className="navbar-search-result-price">{product.priceFormatted}</span>
                    </div>
                  ))}
                  <div className="navbar-search-result-more" onClick={() => {
                    navigate(`/`);
                    setShowResults(false);
                    setSearchQuery('');
                  }}>
                    Ver todos los resultados ({searchResults.length})
                  </div>
                </>
              )}
            </div>
          )}
        </div>