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