import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, LogOut, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

export const CuentaPage = () => {
  const { user, login, register, logout, isLoggedIn, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');

  const { register: regLogin, handleSubmit: handleLogin, formState: { errors: loginErrors } } = useForm<LoginData>();
  const { register: regRegister, handleSubmit: handleRegister, formState: { errors: registerErrors } } = useForm<RegisterData>();

  const onLogin = (data: LoginData) => {
    setError('');
    const result = login(data.email, data.password);
    if (result.success) {
      toast.success('¡Bienvenido!');
    } else {
      setError(result.error ?? '');
    }
  };

  const onRegister = (data: RegisterData) => {
    setError('');
    const result = register(data.nombre, data.email, data.password);
    if (result.success) {
      toast.success('Registro exitoso');
    } else {
      setError(result.error ?? '');
    }
  };

   if (isLoggedIn && user) {
    return (
      <div className="page">
        <div className="form-container">
          <div className="form-card">
            <div className="form-header">
              <div className="form-header-icon">
                <User size={32} />
              </div>
              <h1>Mi cuenta</h1>
              <p>Hola, {user.nombre}</p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>
                Email: {user.email}
              </p>
              <span className={`role-badge ${isAdmin ? 'admin' : 'user'}`}>
                {isAdmin ? 'Administrador' : 'Usuario'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/lista-de-deseos" className="btn btn-secondary" style={{ width: '100%' }}>
                Mi lista de deseos
              </Link>
              <Link to="/carrito" className="btn btn-secondary" style={{ width: '100%' }}>
                Mi carrito
              </Link>
              {isAdmin && (
                <Link to="/admin" className="btn btn-secondary" style={{ width: '100%' }}>
                  <Shield size={16} /> Panel de administración
                </Link>
              )}
              <button onClick={logout} className="btn btn-secondary" style={{ width: '100%', color: 'var(--pink-400)' }}>
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <div className="form-header-icon">
              <User size={32} />
            </div>
            <h1>Mi cuenta</h1>
            <p>Ingresá a tu cuenta o create una nueva</p>
          </div>

          <div className="form-tabs">
            <button
              className={`form-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setError(''); }}
            >
              Iniciar sesión
            </button>
            <button
              className={`form-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveTab('register'); setError(''); }}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div style={{ background: 'rgba(236, 72, 153, 0.1)', border: '1px solid var(--border-pink)', borderRadius: 'var(--radius-lg)', padding: '12px', marginBottom: '16px', fontSize: '14px', color: 'var(--pink-400)' }}>
              {error}
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin(onLogin)}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  {...regLogin('email', { required: 'El email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                  type="email"
                  className={`form-input ${loginErrors.email ? 'error' : ''}`}
                  placeholder="tu@email.com"
                />
                {loginErrors.email && <span className="form-error">{String(loginErrors.email.message)}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input
                  {...regLogin('password', { required: 'La contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                  type="password"
                  className={`form-input ${loginErrors.password ? 'error' : ''}`}
                  placeholder="••••••••"
                />
                {loginErrors.password && <span className="form-error">{String(loginErrors.password.message)}</span>}
              </div>

              <button type="submit" className="form-submit primary">
                Iniciar sesión
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister(onRegister)}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  {...regRegister('nombre', { required: 'El nombre es requerido' })}
                  type="text"
                  className={`form-input ${registerErrors.nombre ? 'error' : ''}`}
                  placeholder="Tu nombre"
                />
                {registerErrors.nombre && <span className="form-error">{String(registerErrors.nombre.message)}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  {...regRegister('email', { required: 'El email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                  type="email"
                  className={`form-input ${registerErrors.email ? 'error' : ''}`}
                  placeholder="tu@email.com"
                />
                {registerErrors.email && <span className="form-error">{String(registerErrors.email.message)}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input
                  {...regRegister('password', { required: 'La contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                  type="password"
                  className={`form-input ${registerErrors.password ? 'error' : ''}`}
                  placeholder="••••••••"
                />
                {registerErrors.password && <span className="form-error">{String(registerErrors.password.message)}</span>}
              </div>

              <button type="submit" className="form-submit primary">
                Crear cuenta
              </button>
            </form>
          )}

          <div className="form-link">
            <Link to="/">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
};