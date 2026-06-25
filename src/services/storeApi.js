import { supabase, isSupabaseConfigured } from './supabaseClient';
import { fallbackCategorias, fallbackConfig, fallbackProductos, fallbackSubcategorias } from '../data/fallback';
import { normalizeProduct } from '../utils/validators';

const orderBy = (field) => (a, b) => (Number(a[field] ?? 0) || 0) - (Number(b[field] ?? 0) || 0);
const active = (row) => row.activo !== false;
const asId = (value) => value === null || value === undefined ? '' : String(value);

async function safeQuery(label, query, fallback) {
  if (!isSupabaseConfigured) return fallback;
  const { data, error } = await query;
  if (error) {
    console.error(`Supabase ${label}:`, error.message);
    return fallback;
  }
  return data ?? fallback;
}

const normalizeCategory = (row, index = 0) => ({
  id: asId(row.id || row.nombre || `categoria-${index}`),
  nombre: row.nombre || 'Categoría',
  icono: row.icono || '📱',
  orden: Number(row.orden ?? index),
  activo: row.activo ?? true,
  raw: row
});

const normalizeSubcategory = (row, categorias = [], index = 0) => {
  const categoryByName = categorias.find((cat) => cat.nombre === row.categoria || cat.nombre === row.categoria_nombre);
  return {
    id: asId(row.id || row.nombre || `subcategoria-${index}`),
    categoria_id: asId(row.categoria_id ?? categoryByName?.id ?? ''),
    nombre: row.nombre || 'Subcategoría',
    orden: Number(row.orden ?? index),
    activo: row.activo ?? true,
    raw: row
  };
};

const normalizeStoreConfig = (row = {}) => ({
  ...fallbackConfig,
  ...row,
  telefono: row.telefono || row.whatsapp || fallbackConfig.telefono,
  banner: row.banner || fallbackConfig.banner,
  logo: row.logo || fallbackConfig.logo,
  titulo_banner: row.titulo_banner || fallbackConfig.titulo_banner,
  subtitulo_banner: row.subtitulo_banner || fallbackConfig.subtitulo_banner,
  nombre_tienda: row.nombre_tienda || fallbackConfig.nombre_tienda
});

const normalizeStoreProduct = (row, categorias = [], subcategorias = []) => {
  const category = categorias.find((cat) => asId(cat.id) === asId(row.categoria_id) || cat.nombre === row.categoria);
  const subcategory = subcategorias.find((sub) => asId(sub.id) === asId(row.subcategoria_id) || sub.nombre === row.subcategoria);
  return normalizeProduct({
    ...row,
    id: asId(row.id),
    descripcion: row.descripcion || '',
    categoria_id: asId(row.categoria_id ?? category?.id ?? ''),
    subcategoria_id: asId(row.subcategoria_id ?? subcategory?.id ?? ''),
    imagen_principal: row.imagen_principal || row.imagen || row.image || '',
    imagenes: row.imagenes || (row.imagen ? [row.imagen] : []),
    precio_anterior: row.precio_anterior ?? null,
    stock: row.stock ?? 0,
    nuevo: row.nuevo ?? false,
    oferta: row.oferta ?? false,
    destacado: row.destacado ?? false,
    marca: row.marca || row.categoria || 'ziX',
    activo: row.activo ?? true,
    fecha: row.fecha || row.created_at || new Date().toISOString()
  });
};

function fallbackData() {
  const categorias = fallbackCategorias.filter(active).map(normalizeCategory).sort(orderBy('orden'));
  const subcategorias = fallbackSubcategorias.filter(active).map((row, i) => normalizeSubcategory(row, categorias, i)).sort(orderBy('orden'));
  return {
    config: normalizeStoreConfig(fallbackConfig),
    categorias,
    subcategorias,
    productos: fallbackProductos.filter(active).map((row) => normalizeStoreProduct(row, categorias, subcategorias))
  };
}

export async function getStoreData() {
  if (!isSupabaseConfigured) return fallbackData();

  const [configRows, rawCategorias, rawSubcategorias, rawProductos] = await Promise.all([
    safeQuery('configuracion', supabase.from('configuracion').select('*').limit(1), [fallbackConfig]),
    safeQuery('categorias', supabase.from('categorias').select('*'), fallbackCategorias),
    safeQuery('subcategorias', supabase.from('subcategorias').select('*'), fallbackSubcategorias),
    safeQuery('productos', supabase.from('productos').select('*'), fallbackProductos)
  ]);

  const categorias = rawCategorias.filter(active).map(normalizeCategory).sort(orderBy('orden'));
  const subcategorias = rawSubcategorias.filter(active).map((row, i) => normalizeSubcategory(row, categorias, i)).sort(orderBy('orden'));
  const productos = rawProductos.filter(active).map((row) => normalizeStoreProduct(row, categorias, subcategorias));

  return {
    config: normalizeStoreConfig(configRows?.[0]),
    categorias,
    subcategorias,
    productos
  };
}

export async function adminList(table) {
  if (!isSupabaseConfigured) return [];
  return safeQuery(table, supabase.from(table).select('*'), []);
}

const withOptionalId = (payload) => (payload.id ? { id: payload.id } : {});
const legacyPayloads = {
  productos: (payload) => ({
    ...withOptionalId(payload),
    nombre: payload.nombre,
    descripcion: payload.descripcion || null,
    precio: Number(payload.precio || 0),
    categoria: payload.categoria || payload.categoria_id || null,
    subcategoria: payload.subcategoria || payload.subcategoria_id || null,
    imagen: payload.imagen || payload.imagen_principal || null,
    stock: Number(payload.stock || 0)
  }),
  categorias: (payload) => ({ ...withOptionalId(payload), nombre: payload.nombre }),
  subcategorias: (payload) => ({ ...withOptionalId(payload), categoria_id: payload.categoria_id, nombre: payload.nombre }),
  configuracion: (payload) => ({ id: payload.id || 1, whatsapp: payload.whatsapp || payload.telefono || null, qr: payload.qr || null })
};

export async function upsertRow(table, payload) {
  if (!isSupabaseConfigured) throw new Error('Configura Supabase para guardar cambios.');
  const { data, error } = await supabase.from(table).upsert(payload).select().single();
  if (!error) return data;
  const mapLegacy = legacyPayloads[table];
  if (mapLegacy) {
    const retry = await supabase.from(table).upsert(mapLegacy(payload)).select().single();
    if (!retry.error) return retry.data;
  }
  throw error;
}

export async function deleteRow(table, id) {
  if (!isSupabaseConfigured) throw new Error('Configura Supabase para eliminar.');
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  return true;
}
