import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getStoreData } from '../services/storeApi';
import { loadStorage, saveStorage } from '../utils/storage';

const StoreContext = createContext(null);
export function StoreProvider({ children }) {
  const [data, setData] = useState({ config: null, categorias: [], subcategorias: [], productos: [] });
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const [cartOpen, setCartOpen] = useState(false); const [quickView, setQuickView] = useState(null);
  const [cart, setCart] = useState(() => loadStorage('zix_cart', []));
  const [favorites, setFavorites] = useState(() => loadStorage('zix_favorites', []));
  const refresh = useCallback(async () => { setLoading(true); setError(''); try { setData(await getStoreData()); } catch (e) { setError(e.message || 'Error cargando tienda'); } finally { setLoading(false); } }, []);
  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => saveStorage('zix_cart', cart), [cart]); useEffect(() => saveStorage('zix_favorites', favorites), [favorites]);
  const addToCart = (product, qty = 1) => { if (!product || product.stock <= 0) return; setCart((items) => { const found = items.find((item) => item.id === product.id); return found ? items.map((item) => item.id === product.id ? { ...item, qty: Math.min(item.qty + qty, product.stock) } : item) : [...items, { ...product, qty }]; }); setCartOpen(true); };
  const updateQty = (id, qty) => setCart((items) => items.map((item) => item.id === id ? { ...item, qty: Math.max(1, Math.min(Number(qty), item.stock || 99)) } : item));
  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const toggleFavorite = (id) => setFavorites((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.precio * item.qty, 0), [cart]);
  const value = { ...data, loading, error, refresh, cart, cartOpen, setCartOpen, addToCart, updateQty, removeFromCart, clearCart, cartTotal, favorites, toggleFavorite, quickView, setQuickView };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);
