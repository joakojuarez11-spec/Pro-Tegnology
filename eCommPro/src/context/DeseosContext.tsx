/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

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