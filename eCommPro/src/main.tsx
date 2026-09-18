import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { ProductosProvider } from './context/ProductContext'
import { CarritoProvider } from './context/CarritoContext'
import { DeseosProvider } from './context/DeseosContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <DeseosProvider>
            <App />
          </DeseosProvider>
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  </StrictMode>,
)
