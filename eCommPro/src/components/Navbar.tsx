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