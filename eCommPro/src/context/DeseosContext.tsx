/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as deseosService from '../services/deseosServices';
import { useAuth } from './AuthContext';

interface DeseosContextType {
  deseos: number[];
  addDeseo: (productId: number) => void;
  removeDeseo: (productId: number) => void;
  isInDeseos: (productId: number) => boolean;
}

const DeseosContext = createContext<DeseosContextType | null>(null);

export const useDeseos = () => {
  const context = useContext(DeseosContext);
  if (!context) {
    throw new Error('useDeseos debe usarse dentro de DeseosProvider');
  }
  return context;
};

export const DeseosProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [deseos, setDeseos] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      setDeseos(deseosService.getDeseos(user.id));
    } else {
      setDeseos([]);
    }
  }, [user]);

  const addDeseo = (productId: number) => {
    if (!user) return;
    deseosService.addDeseo(user.id, productId);
    setDeseos(deseosService.getDeseos(user.id));
  };

  const removeDeseo = (productId: number) => {
    if (!user) return;
    deseosService.removeDeseo(user.id, productId);
    setDeseos(deseosService.getDeseos(user.id));
  };

  const isInDeseos = (productId: number) => {
    if (!user) return false;
    return deseos.includes(productId);
  };

  return (
    <DeseosContext.Provider value={{ deseos, addDeseo, removeDeseo, isInDeseos }}>
      {children}
    </DeseosContext.Provider>
  );
};