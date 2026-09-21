const STORAGE_KEY = 'productos';
const STORAGE_VERSION_KEY = 'productos_version';
const CURRENT_VERSION = 12;

export interface Producto {
  id: number;
  name: string;
  image: string;
  category: string;
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  imageBg: string;
  description: string;
  specs: string[];
  destacado: boolean;
  oferta: boolean;
  brand: string;
  discount: number;
  badgeType: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface Categoria {
  slug: string;
  label: string;
}

const laptopImages: Record<string, string> = {
  'Lenovo IdeaPad Gaming 3': new URL('../assets/Laptops/Lenovo IdeaPad Gaming 3.png', import.meta.url).href,
  'ASUS TUF Gaming F15': new URL('../assets/Laptops/ASUS TUF Gaming F15.png', import.meta.url).href,
  'HP Victus 15': new URL('../assets/Laptops/HP Victus 15.png', import.meta.url).href,
  'Acer Nitro 5': new URL('../assets/Laptops/Acer Nitro 5.png', import.meta.url).href,
  'MSI GF63 Thin': new URL('../assets/Laptops/MSI GF63 Thin.png', import.meta.url).href,
  'Lenovo Legion 5': new URL('../assets/Laptops/Lenovo Legion 5.png', import.meta.url).href,
};

const pcGamerImages: Record<string, string> = {
  'Torre Gamer ASUS ROG Strix': new URL('../assets/PCGamer/Torre Gamer ASUS ROG Strix.png', import.meta.url).href,
  'PC Gaming MSI Infinite RS': new URL('../assets/PCGamer/PC Gaming MSI Infinite RS.png', import.meta.url).href,
  'HP OMEN 35L Desktop': new URL('../assets/PCGamer/HP OMEN 35L Desktop.png', import.meta.url).href,
  'Lenovo Legion Tower 5': new URL('../assets/PCGamer/Lenovo Legion Tower 5.png', import.meta.url).href,
  'Acer Predator Orion 5000': new URL('../assets/PCGamer/Acer Predator Orion 5000.png', import.meta.url).href,
  'PC Gamer Ryzen 9 RTX 4080': new URL('../assets/PCGamer/PC Gamer Ryzen 9 RTX 4080.png', import.meta.url).href,
};
const celularesImages: Record<string, string> = {
  'iPhone 15 Pro Max 256GB': new URL('../assets/Celulares/iPhone 15 Pro Max 256GB.png', import.meta.url).href,
  'Samsung Galaxy S24 Ultra': new URL('../assets/Celulares/Samsung Galaxy S24 Ultra.png', import.meta.url).href,
  'Samsung Galaxy A54 5G': new URL('../assets/Celulares/Samsung Galaxy A54 5G.png', import.meta.url).href,
  'Xiaomi 13T Pro': new URL('../assets/Celulares/Xiaomi 13T Pro.png', import.meta.url).href,
  'Motorola Edge 40 Pro': new URL('../assets/Celulares/Motorola Edge 40 Pro.png', import.meta.url).href,
  'Google Pixel 8 Pro': new URL('../assets/Celulares/Google Pixel 8 Pro.png', import.meta.url).href,
};

const accesoriosImages: Record<string, string> = {
  'Funda Silicone Premium iPhone 15': new URL('../assets/Accesorios/Funda Silicone Premium iPhone 15.png', import.meta.url).href,
  'Cargador USB-C GaN 65W': new URL('../assets/Accesorios/Cargador USB-C GaN 65W.png', import.meta.url).href,
  'Auriculares Bluetooth Pro Max': new URL('../assets/Accesorios/Auriculares Bluetooth Pro Max.png', import.meta.url).href,
  'Cable USB-C Premium 2m': new URL('../assets/Accesorios/Cable USB-C Premium 2m.png', import.meta.url).href,
  'Soporte Magnético para Auto': new URL('../assets/Accesorios/Soporte Magnético para Auto.png', import.meta.url).href,
  'Powerbank 20000mAh 65W': new URL('../assets/Accesorios/Powerbank 20000mAh 65W.png', import.meta.url).href,
};

const componentesImages: Record<string, string> = {
  'SSD NVMe 2TB Kingston': new URL('../assets/Componentes/SSD NVMe 2TB Kingston.png', import.meta.url).href,
  'Tarjeta Madre ASUS ROG Strix B650E': new URL('../assets/Componentes/Tarjeta Madre ASUS ROG Strix B650E.png', import.meta.url).href,
  'RAM DDR5 32GB Corsair Vengeance': new URL('../assets/Componentes/RAM DDR5 32GB Corsair Vengeance.png', import.meta.url).href,
  'Fuente 850W 80+ Gold Corsair': new URL('../assets/Componentes/Fuente 850W 80+ Gold Corsair.png', import.meta.url).href,
  'Procesador AMD Ryzen 7 7800X3D': new URL('../assets/Componentes/Procesador AMD Ryzen 7 7800X3D.png', import.meta.url).href,
  'Cooler CPU Noctua NH-D15': new URL('../assets/Componentes/Cooler CPU Noctua NH-D15.png', import.meta.url).href,
};

const perifericosImages: Record<string, string> = {
  'Auriculares Gamer RGB 7.1': new URL('../assets/Perifericos/Auriculares Gamer RGB 7.1.png', import.meta.url).href,
  'Mouse Óptico Gamer 16000 DPI': new URL('../assets/Perifericos/Mouse Óptico Gamer 16000 DPI.png', import.meta.url).href,
  'Teclado Mecánico RGB Switch Red': new URL('../assets/Perifericos/Teclado Mecánico RGB Switch Red.png', import.meta.url).href,
  'Monitor Curvo 27\'\' 165Hz Gaming': new URL('../assets/Perifericos/Monitor Curvo 27\'\' 165Hz Gaming.png', import.meta.url).href,
  'Webcam Full HD 1080p': new URL('../assets/Perifericos/Webcam Full HD 1080p.png', import.meta.url).href,
  'Mousepad Gamer XL RGB': new URL('../assets/Perifericos/Mousepad Gamer XL RGB.png', import.meta.url).href,
};

const gamingImages: Record<string, string> = {
  'Silla Gamer Ergonómica RGB': new URL('../assets/Gaming/Silla Gamer Ergonómica RGB.png', import.meta.url).href,
  'Control Xbox Wireless Carbon Black': new URL('../assets/Gaming/Control Xbox Wireless Carbon Black.png', import.meta.url).href,
  'Joystick Thrustmaster T300 RS GT': new URL('../assets/Gaming/Joystick Thrustmaster T300 RS GT.png', import.meta.url).href,
  'Consola Portátil Steam Deck 512GB': new URL('../assets/Gaming/Consola Portátil Steam Deck 512GB.png', import.meta.url).href,
  'Escritorio Gamer RGB 140cm': new URL('../assets/Gaming/Escritorio Gamer RGB 140cm.png', import.meta.url).href,
  'Lente Cámara Streaming 4K': new URL('../assets/Gaming/Lente Cámara Streaming 4K.png', import.meta.url).href,
};

const ofertasImages: Record<string, string> = {
  'Samsung Galaxy S24 128GB': new URL('../assets/Celulares/Samsung Galaxy S24 Ultra.png', import.meta.url).href,
  'iPhone 14 128GB': new URL('../assets/Celulares/iPhone 15 Pro Max 256GB.png', import.meta.url).href,
  'ASUS TUF Gaming F15 RTX 4050': new URL('../assets/Laptops/ASUS TUF Gaming F15.png', import.meta.url).href,
  'Teclado Logitech MX Keys S': new URL('../assets/Perifericos/Teclado Mecánico RGB Switch Red.png', import.meta.url).href,
  'Monitor LG 27\'\' 4K UHD': new URL('../assets/Perifericos/Monitor Curvo 27\'\' 165Hz Gaming.png', import.meta.url).href,
  'Auriculares Sony WH-1000XM5': new URL('../assets/Accesorios/Auriculares Bluetooth Pro Max.png', import.meta.url).href,
  'Monitor Curvo 27\'\' 165Hz Gaming': new URL('../assets/Perifericos/Monitor Curvo 27\'\' 165Hz Gaming.png', import.meta.url).href,
};
const productosIniciales: Producto[] = [
  // ==================== LAPTOPS (6) ====================
  {
    id: 1,
    name: "Lenovo IdeaPad Gaming 3",
    image: laptopImages['Lenovo IdeaPad Gaming 3'],
    category: "laptops",
    categoryLabel: "Laptops",
    price: 749990,
    priceFormatted: "$749.990",
    imageBg: "cyan-blue",
    description: "Notebook gamer con Ryzen 5, 8GB RAM, RTX 3050, SSD 512GB. Pantalla IPS 15.6'' Full HD 120Hz.",
    specs: ["Ryzen 5 5600H", "8GB DDR4", "RTX 3050 4GB", "512GB SSD", "15.6'' FHD 120Hz"],
    destacado: true,
    oferta: false,
    brand: "Lenovo",
    discount: 15,
    badgeType: "discount",
    rating: 4.5,
    reviews: 124,
    stock: 15
  },
  {
    id: 2,
    name: "ASUS TUF Gaming F15",
    image: laptopImages['ASUS TUF Gaming F15'],
    category: "laptops",
    categoryLabel: "Laptops",
    price: 1299990,
    priceFormatted: "$1.299.990",
    imageBg: "purple-indigo",
    description: "Notebook gamer con Intel i7, 16GB RAM, RTX 4060, SSD 1TB. Pantalla 15.6'' FHD 144Hz.",
    specs: ["Intel i7-12700H", "16GB DDR5", "RTX 4060 8GB", "1TB SSD", "15.6'' FHD 144Hz"],
    destacado: true,
    oferta: false,
    brand: "ASUS",
    discount: 0,
    badgeType: "new",
    rating: 4.8,
    reviews: 86,
    stock: 8
  },
  {
    id: 3,
    name: "HP Victus 15",
    image: laptopImages['HP Victus 15'],
    category: "laptops",
    categoryLabel: "Laptops",
    price: 1099990,
    priceFormatted: "$1.099.990",
    imageBg: "pink-purple",
    description: "Notebook gamer con Intel i5, 16GB RAM, RTX 4050, SSD 512GB. Pantalla 15.6'' FHD 144Hz.",
    specs: ["Intel i5-12500H", "16GB DDR4", "RTX 4050 6GB", "512GB SSD", "15.6'' FHD 144Hz"],
    destacado: true,
    oferta: true,
    brand: "HP",
    discount: 0,
    badgeType: "offer",
    rating: 4.3,
    reviews: 72,
    stock: 22
  },
  {
    id: 4,
    name: "Acer Nitro 5",
    image: laptopImages['Acer Nitro 5'],
    category: "laptops",
    categoryLabel: "Laptops",
    price: 999990,
    priceFormatted: "$999.990",
    imageBg: "cyan-teal",
    description: "Notebook gamer con Ryzen 7, 16GB RAM, RTX 3060, SSD 512GB. Pantalla 15.6'' FHD 165Hz.",
    specs: ["Ryzen 7 6800H", "16GB DDR5", "RTX 3060 6GB", "512GB SSD", "15.6'' FHD 165Hz"],
    destacado: true,
    oferta: false,
    brand: "Acer",
    discount: 10,
    badgeType: "discount",
    rating: 4.6,
    reviews: 64,
    stock: 12
  },
  {
    id: 5,
    name: "MSI GF63 Thin",
    image: laptopImages['MSI GF63 Thin'],
    category: "laptops",
    categoryLabel: "Laptops",
    price: 1199990,
    priceFormatted: "$1.199.990",
    imageBg: "blue-purple",
    description: "Notebook gamer delgada con Intel i7, 16GB RAM, RTX 4050, SSD 512GB.",
    specs: ["Intel i7-12650H", "16GB DDR4", "RTX 4050 6GB", "512GB SSD", "15.6'' FHD 144Hz"],
    destacado: true,
    oferta: false,
    brand: "MSI",
    discount: 0,
    badgeType: "new",
    rating: 4.7,
    reviews: 58,
    stock: 10
  },
  {
    id: 6,
    name: "Lenovo Legion 5",
    image: laptopImages['Lenovo Legion 5'],
    category: "laptops",
    categoryLabel: "Laptops",
    price: 1499990,
    priceFormatted: "$1.499.990",
    imageBg: "indigo-cyan",
    description: "Notebook gamer premium con Ryzen 7, 32GB RAM, RTX 4070, SSD 1TB. Pantalla 16'' QHD 165Hz.",
    specs: ["Ryzen 7 7745HX", "32GB DDR5", "RTX 4070 8GB", "1TB SSD", "16'' QHD 165Hz"],
    destacado: true,
    oferta: false,
    brand: "Lenovo",
    discount: 8,
    badgeType: "discount",
    rating: 4.4,
    reviews: 95,
    stock: 5
  },

  // ==================== PC GAMER (6) ====================
  {
    id: 7,
    name: "Torre Gamer ASUS ROG Strix",
    image: pcGamerImages['Torre Gamer ASUS ROG Strix'],
    category: "pc-gamer",
    categoryLabel: "PC Gamer",
    price: 1850000,
    priceFormatted: "$1.850.000",
    imageBg: "purple-indigo",
    description: "PC de escritorio gamer con Intel i7, 32GB RAM, RTX 4070 Ti. Torre con RGB y refrigeración líquida.",
    specs: ["Intel i7-13700K", "32GB DDR5", "RTX 4070 Ti 12GB", "1TB SSD NVMe", "Refrigeración líquida"],
    destacado: true,
    oferta: true,
    brand: "ASUS",
    discount: 0,
    badgeType: "offer",
    rating: 4.8,
    reviews: 86,
    stock: 7
  },
  {
    id: 8,
    name: "PC Gaming MSI Infinite RS",
    image: pcGamerImages['PC Gaming MSI Infinite RS'],
    category: "pc-gamer",
    categoryLabel: "PC Gamer",
    price: 2199990,
    priceFormatted: "$2.199.990",
    imageBg: "cyan-blue",
    description: "PC gamer con Intel i9, 32GB RAM DDR5, RTX 4080. Diseño premium con panel de cristal.",
    specs: ["Intel i9-13900K", "32GB DDR5", "RTX 4080 16GB", "2TB SSD NVMe", "Panel de cristal"],
    destacado: true,
    oferta: false,
    brand: "MSI",
    discount: 0,
    badgeType: "new",
    rating: 4.7,
    reviews: 45,
    stock: 3
  },
  {
    id: 9,
    name: "HP OMEN 35L Desktop",
    image: pcGamerImages['HP OMEN 35L Desktop'],
    category: "pc-gamer",
    categoryLabel: "PC Gamer",
    price: 1599990,
    priceFormatted: "$1.599.990",
    imageBg: "pink-purple",
    description: "PC gamer con Intel i7, 16GB RAM, RTX 4060 Ti. Torre compacta con RGB personalizable.",
    specs: ["Intel i7-13700F", "16GB DDR5", "RTX 4060 Ti 8GB", "1TB SSD", "RGB personalizable"],
    destacado: true,
    oferta: false,
    brand: "HP",
    discount: 12,
    badgeType: "discount",
    rating: 4.5,
    reviews: 78,
    stock: 18
  },
  {
    id: 10,
    name: "Lenovo Legion Tower 5",
    image: pcGamerImages['Lenovo Legion Tower 5'],
    category: "pc-gamer",
    categoryLabel: "PC Gamer",
    price: 1799990,
    priceFormatted: "$1.799.990",
    imageBg: "cyan-teal",
    description: "PC gamer con AMD Ryzen 7, 32GB RAM, RTX 4070. Torre elegante con excelente refrigeración.",
    specs: ["AMD Ryzen 7 7700X", "32GB DDR5", "RTX 4070 12GB", "1TB SSD NVMe", "Refrigeración air"],
    destacado: true,
    oferta: false,
    brand: "Lenovo",
    discount: 0,
    badgeType: "new",
    rating: 4.6,
    reviews: 52,
    stock: 9
  },
  {
    id: 11,
    name: "Acer Predator Orion 5000",
    image: pcGamerImages['Acer Predator Orion 5000'],
    category: "pc-gamer",
    categoryLabel: "PC Gamer",
    price: 1999990,
    priceFormatted: "$1.999.990",
    imageBg: "blue-purple",
    description: "PC gamer premium con Intel i9, 32GB RAM, RTX 4070 Ti. Enfriamiento líquido AIO.",
    specs: ["Intel i9-13900F", "32GB DDR5", "RTX 4070 Ti 12GB", "1TB SSD", "AIO 240mm"],
    destacado: true,
    oferta: false,
    brand: "Acer",
    discount: 5,
    badgeType: "discount",
    rating: 4.4,
    reviews: 63,
    stock: 6
  },
  {
    id: 12,
    name: "PC Gamer Ryzen 9 RTX 4080",
    image: pcGamerImages['PC Gamer Ryzen 9 RTX 4080'],
    category: "pc-gamer",
    categoryLabel: "PC Gamer",
    price: 2499990,
    priceFormatted: "$2.499.990",
    imageBg: "indigo-cyan",
    description: "PC gamer extremo con AMD Ryzen 9, 64GB RAM, RTX 4080. Para gaming y creación de contenido.",
    specs: ["AMD Ryzen 9 7950X", "64GB DDR5", "RTX 4080 16GB", "2TB SSD NVMe", "Refrigeración líquida 360mm"],
    destacado: true,
    oferta: true,
    brand: "ASUS",
    discount: 0,
    badgeType: "offer",
    rating: 4.9,
    reviews: 34,
    stock: 4
  },
