import { Search, User, Heart, ShoppingCart, Home, Menu, X, ChevronDown, ChevronUp, Shield, Info } from 'lucide-react';

{/* Solo mobile: Categorías dropdown + otros enlaces */}

          <Link to="/lista-de-deseos" className="navbar-nav-link" onClick={() => setMenuOpen(false)}>
            <Heart size={16} /> Lista de deseos
          </Link>