export const fallbackConfig = {
  nombre_tienda: 'ziX Store', 
  logo: 'https://qawaafuhxutblwirdbvq.supabase.co/storage/v1/object/public/Productos/LOGO%20ZIX.jpeg', 
  banner: 'https://qawaafuhxutblwirdbvq.supabase.co/storage/v1/object/public/Productos/BANNER.png',
  titulo_banner: 'Accesorios premium para tu iPhone', 
  subtitulo_banner: 'Diseño elegante, protección real y tecnología lista para acompañarte cada día.',
  telefono: '+1 555 000 000', 
  correo: 'hola@zixstore.com', 
  instagram: 'https://instagram.com/', 
  facebook: 'https://facebook.com/', 
  tiktok: 'https://tiktok.com/', 
  direccion: 'Online Store', 
  tema: 'light', 
  color_principal: '#111114', 
  color_secundario: '#6d5dfc', 
  horario: 'Lun–Sáb 9:00–19:00'
};

export const fallbackCategorias = [
  { id: 'cases', nombre: 'Fundas', icono: '📱', orden: 1, activo: true },
  { id: 'chargers', nombre: 'Carga', icono: '⚡', orden: 2, activo: true },
  { id: 'protectors', nombre: 'Protección', icono: '🛡️', orden: 3, activo: true },
  { id: 'audio', nombre: 'Audio', icono: '🎧', orden: 4, activo: true }
];

export const fallbackSubcategorias = [
  { id: 'all-11', categoria_id: 'cases', nombre: 'iPhone 11', orden: 1, activo: true }, { id: 'all-12', categoria_id: 'cases', nombre: 'iPhone 12', orden: 2, activo: true },
  { id: 'all-13', categoria_id: 'cases', nombre: 'iPhone 13', orden: 3, activo: true }, { id: 'all-14', categoria_id: 'cases', nombre: 'iPhone 14', orden: 4, activo: true },
  { id: 'all-15', categoria_id: 'cases', nombre: 'iPhone 15', orden: 5, activo: true }, { id: 'all-16', categoria_id: 'cases', nombre: 'iPhone 16', orden: 6, activo: true },
  { id: 'magsafe', categoria_id: 'chargers', nombre: 'MagSafe', orden: 1, activo: true }, { id: 'usb-c', categoria_id: 'chargers', nombre: 'USB-C', orden: 2, activo: true },
  { id: 'glass', categoria_id: 'protectors', nombre: 'Cristal templado', orden: 1, activo: true }, { id: 'privacy', categoria_id: 'protectors', nombre: 'Privacidad', orden: 2, activo: true }
];

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=85`;
export const fallbackProductos = [
  { id: 'p1', nombre: 'Funda Clear MagSafe Pro', descripcion: 'Funda transparente con imanes reforzados y protección anti-impacto.', precio: 29.99, precio_anterior: 39.99, categoria_id: 'cases', subcategoria_id: 'all-15', imagen_principal: img('1601593346740-925612772716'), imagenes: [img('1601593346740-925612772716')], stock: 18, nuevo: true, oferta: true, destacado: true, marca: 'ziX', activo: true, fecha: '2026-06-01' },
  { id: 'p2', nombre: 'Cargador GaN 35W USB-C', descripcion: 'Carga rápida compacta con protección inteligente de temperatura.', precio: 34.99, precio_anterior: 44.99, categoria_id: 'chargers', subcategoria_id: 'usb-c', imagen_principal: img('1610945265064-0e34e5519bbf'), imagenes: [img('1610945265064-0e34e5519bbf')], stock: 12, nuevo: false, oferta: true, destacado: true, marca: 'Anker', activo: true, fecha: '2026-05-12' },
  { id: 'p3', nombre: 'Protector Ceramic Privacy', descripcion: 'Cristal de privacidad con acabado suave y máxima claridad frontal.', precio: 19.99, precio_anterior: null, categoria_id: 'protectors', subcategoria_id: 'privacy', imagen_principal: img('1556656793-08538906a9f8'), imagenes: [img('1556656793-08538906a9f8')], stock: 0, nuevo: true, oferta: false, destacado: false, marca: 'Belkin', activo: true, fecha: '2026-06-10' },
  { id: 'p4', nombre: 'Soporte MagSafe Minimal', descripcion: 'Base magnética de aluminio para escritorio y videollamadas.', precio: 27.5, precio_anterior: 35, categoria_id: 'chargers', subcategoria_id: 'magsafe', imagen_principal: img('1616410011236-7a42121dd981'), imagenes: [img('1616410011236-7a42121dd981')], stock: 9, nuevo: false, oferta: true, destacado: false, marca: 'ziX', activo: true, fecha: '2026-04-20' }
];
