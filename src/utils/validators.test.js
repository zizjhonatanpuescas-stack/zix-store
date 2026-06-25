import { describe, expect, it } from 'vitest';
import { discountPercent } from './format';
import { normalizeProduct, validateProduct } from './validators';

describe('product utilities', () => {
  it('validates required product fields', () => {
    const result = validateProduct({ nombre: '', precio: -1, stock: -2 });
    expect(result.valid).toBe(false);
    expect(result.errors.nombre).toBeTruthy();
  });
  it('normalizes admin product payloads', () => {
    const product = normalizeProduct({ precio: '12.5', stock: '3', imagenes: 'a\nb', oferta: 1 });
    expect(product.precio).toBe(12.5);
    expect(product.stock).toBe(3);
    expect(product.imagenes).toEqual(['a', 'b']);
    expect(product.oferta).toBe(true);
  });
  it('calculates discount percentage', () => {
    expect(discountPercent(80, 100)).toBe(20);
  });
});
