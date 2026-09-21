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