import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Home, Menu, X, ChevronDown, ChevronUp, Shield, Info } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { useProductos } from '../context/ProductosContext';
import logoImg from '../assets/logo.png';
import nameImg from '../assets/name.png';
import fondoHero from '../assets/fondo-hero.jpg';