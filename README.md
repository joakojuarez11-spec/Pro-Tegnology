# Pro Technology - Plataforma de Comercio Electrónico

Plataforma de comercio electrónico para productos tecnológicos y gaming. Desarrollada con React y TypeScript.

## Descripción

Pro Technology permite a los usuarios navegar por un catálogo de productos tecnológicos, ver detalles, gestionar una lista de deseos y realizar compras. Los administradores pueden gestionar el inventario completo y los usuarios registrados.

## Stack Tecnológico

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Enrutamiento:** React Router DOM 7
- **Formularios:** React Hook Form 7
- **Estado:** Context API
- **Persistencia:** LocalStorage
- **Estilos:** CSS puro (sin librerías externas)
- **Iconos:** Lucide React

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## Estructura del Proyecto

```
src/
├── assets/              # Imágenes y recursos estáticos
├── components/          # Componentes reutilizables
│   ├── Button.tsx       # Botón reutilizable
│   ├── Card.tsx         # Tarjeta reutilizable
│   ├── Footer.tsx       # Pie de página
│   ├── HeroBanner.tsx   # Banner principal
│   ├── Modal.tsx        # Modal reutilizable
│   ├── Navbar.tsx       # Barra de navegación
│   ├── ProductsSection.tsx  # Sección de productos destacados
│   ├── ProtectedRoute.tsx   # Ruta protegida por rol
│   └── ScrollToTop.tsx  # Auto-scroll al cambiar ruta
├── context/             # Contextos de estado global
│   ├── AuthContext.tsx   # Autenticación y sesión
│   ├── CarritoContext.tsx # Carrito de compras
│   ├── DeseosContext.tsx # Lista de deseos
│   └── ProductosContext.tsx # Catálogo de productos
├── pages/               # Páginas de la aplicación
│   ├── AboutPage.tsx    # Sección "Nosotros"
│   ├── AdminPage.tsx    # Panel de administración
│   ├── CarritoPage.tsx  # Carrito de compras
│   ├── CategoriaPage.tsx # Listado por categoría
│   ├── CuentaPage.tsx   # Login / Registro / Cuenta
│   ├── HomePage.tsx     # Página principal
│   ├── ListaDeseosPage.tsx # Lista de deseos
│   ├── NotFoundPage.tsx # Página 404
│   └── ProductoDetallePage.tsx # Detalle de producto
├── services/            # Servicios de persistencia
│   ├── authService.js   # Autenticación (localStorage)
│   ├── carritoService.js # Carrito (localStorage)
│   ├── deseosService.js # Lista de deseos (localStorage)
│   └── productoService.js # Catálogo de productos
├── styles/              # Hojas de estilo CSS
│   ├── about.css        # Estilos página About
│   ├── admin.css        # Estilos panel Admin
│   ├── footer.css       # Estilos del footer
│   ├── forms.css        # Estilos de formularios
│   ├── globals.css      # Variables y reset global
│   ├── hero.css         # Estilos del hero banner
│   ├── navbar.css       # Estilos del navbar
│   ├── pages.css        # Estilos de páginas
│   └── products.css     # Estilos de cards de productos
├── App.tsx              # Configuración de rutas
├── index.css            # Imports de estilos
└── main.tsx             # Punto de entrada
```

## Rutas

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/` | Catálogo principal con hero banner | No |
| `/categoria/:slug` | Listado de productos por categoría | No |
| `/producto/:id` | Detalle de un producto | No |
| `/carrito` | Carrito de compras | No |
| `/cuenta` | Login, registro y dashboard de cuenta | No |
| `/lista-de-deseos` | Lista de deseos del usuario | Sí (logueado) |
| `/admin` | Panel de administración (CRUD productos y usuarios) | Sí (admin) |
| `/about` | Sección "Nosotros" con galería del equipo | No |
| `*` | Página de error 404 | No |

## Funcionalidades por Rol

### Visitante / Invitado
- Explorar catálogo de productos con filtros por categoría y marca
- Ver detalle de productos (nombre, precio, categoría, stock, descripción, especificaciones)
- Buscar productos por nombre
- Navegar por categorías

### Usuario Registrado
- Todas las funcionalidades del visitante
- Gestionar lista de deseos (agregar/eliminar productos)
- Ver carrito de compras
- Ver y gestionar su cuenta

### Administrador
- Todas las funcionalidades del usuario
- Panel de administración con CRUD completo de productos
- Agregar, editar y eliminar productos
- Visualizar y eliminar usuarios registrados
- Validación de campos obligatorios en formularios

## Modelo de Datos

### Producto
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | number | Código único (auto-generado) |
| name | string | Nombre del producto |
| price | number | Precio numérico |
| priceFormatted | string | Precio formateado |
| category | string | Slug de la categoría |
| categoryLabel | string | Nombre de la categoría |
| image | string | URL de la imagen |
| description | string | Descripción del producto |
| stock | number | Cantidad disponible |
| specs | string[] | Especificaciones técnicas |
| brand | string | Marca del producto |
| rating | number | Valoración promedio |
| reviews | number | Cantidad de reseñas |

### Usuario
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | number | Código único |
| nombre | string | Nombre del usuario |
| email | string | Email (único) |
| password | string | Contraseña |
| role | string | "admin" o "user" |

## Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | demo@protechnology.com | 123456 |

## Categorías

- Laptops
- PC Gamer
- Celulares
- Accesorios
- Componentes
- Periféricos
- Gaming

## Decisiones de Diseño

- **CSS puro:** Se utiliza CSS con variables custom para mantener un diseño consistente sin dependencias externas.
- **Tema gaming:** Paleta de colores oscura con acentos cyan y rosa.
- **Responsive:** Diseño adaptable a móvil, tablet y escritorio con breakpoints en 768px, 1024px y 1280px.
- **LocalStorage:** Toda la persistencia de datos se maneja en el navegador (productos, usuarios, carrito, lista de deseos).
