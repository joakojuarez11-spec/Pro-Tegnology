/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as deseosService from '../services/deseosService';
import { useAuth } from './AuthContext';

interface DeseosContextType {
  deseos: number[];
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


  return (
    <DeseosContext.Provider value={{ deseos }}>
      {children}
    </DeseosContext.Provider>
  );
};