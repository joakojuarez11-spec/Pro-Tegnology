const USER_KEY = 'usuario_actual';
const USERS_KEY = 'usuarios';

interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  role: string;
}

interface SafeUser {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

export interface AuthResult {
  success: boolean;
  user?: SafeUser;
  error?: string;
}

const usuariosDefault: User[] = [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin"
  }
];

export const login = (email: string, password: string): AuthResult => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _pass, ...safeUser } = user;
    localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  }
  return { success: false, error: 'Email o contraseña incorrectos' };
};

export const register = (nombre: string, email: string, password: string): AuthResult => {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'El email ya está registrado' };
  }
  const newUser: User = {
    id: Date.now(),
    nombre,
    email,
    password,
    role: "user"
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const { password: _pass, ...safeUser } = newUser;
  localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
  return { success: true, user: safeUser };
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = (): SafeUser | null => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};

export const getAllUsers = (): SafeUser[] => {
  const users = getUsers();
  return users.map(({ password: _pass, ...safe }) => safe);
};

export const deleteUser = (id: number): void => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
};

const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usuariosDefault));
    return usuariosDefault;
  }
  return JSON.parse(stored);
};
