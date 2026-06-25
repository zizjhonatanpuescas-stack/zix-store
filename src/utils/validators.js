export function validateProduct(product) {
  const errors = {};
  if (!product.nombre?.trim()) errors.nombre = 'El nombre es obligatorio';
  if (Number(product.precio) < 0 || product.precio === '') errors.precio = 'El precio debe ser válido';
  if (Number(product.stock) < 0 || product.stock === '') errors.stock = 'El stock debe ser válido';
  return { valid: Object.keys(errors).length === 0, errors };
}
export function normalizeProduct(product) {
  return {
    ...product,
    precio: Number(product.precio || 0), precio_anterior: product.precio_anterior ? Number(product.precio_anterior) : null,
    stock: Number(product.stock || 0), activo: product.activo ?? true,
    nuevo: Boolean(product.nuevo), oferta: Boolean(product.oferta), destacado: Boolean(product.destacado),
    imagenes: typeof product.imagenes === 'string' ? product.imagenes.split('\n').map(x => x.trim()).filter(Boolean) : product.imagenes || []
  };
}
