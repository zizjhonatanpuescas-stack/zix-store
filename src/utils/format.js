export const currency = (value = 0) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
export const discountPercent = (price, oldPrice) => oldPrice && Number(oldPrice) > Number(price) ? Math.round((1 - Number(price) / Number(oldPrice)) * 100) : 0;
export const slugify = (text = '') => text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const safeArray = (value) => Array.isArray(value) ? value : value ? [value] : [];
