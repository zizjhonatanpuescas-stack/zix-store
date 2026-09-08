import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
export default function Header() {
  const { config, cart, favorites, productos, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false); const [mobile, setMobile] = useState(false); const [query, setQuery] = useState(''); const [searchOpen, setSearchOpen] = useState(false); const navigate = useNavigate();
  useEffect(() => { const on = () => setScrolled(scrollY > 24); on(); addEventListener('scroll', on); return () => removeEventListener('scroll', on); }, []);
  const suggestions = useMemo(() => query.length > 1 ? productos.filter(p => `${p.nombre} ${p.descripcion} ${p.marca}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [], [query, productos]);
  const nav = <><NavLink to="/" onClick={()=>setMobile(false)} className="hover:text-black/60">Inicio</NavLink><a href="/#categorias" onClick={()=>setMobile(false)} className="hover:text-black/60">Categorías</a><a href="/#ofertas" onClick={()=>setMobile(false)} className="hover:text-black/60">Ofertas</a><a href="#contacto" onClick={()=>setMobile(false)} className="hover:text-black/60">Contacto</a></>;
  const searchBox = <div className="relative w-full"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"/><input aria-label="Buscar" className="input rounded-full py-2 pl-9" placeholder="Buscar accesorios..." value={query} onChange={e=>setQuery(e.target.value)} />{suggestions.length>0 && <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-3xl bg-white shadow-premium">{suggestions.map(p=><button key={p.id} onClick={()=>{navigate(`/producto/${p.id}`); setQuery(''); setSearchOpen(false);}} className="block w-full px-4 py-3 text-left text-sm hover:bg-mist">{p.nombre}</button>)}</div>}</div>;
  return <header className={`fixed inset-x-0 top-0 z-40 transition ${scrolled ? 'py-2' : 'py-4'}`}><div className="section"><div className={`glass flex items-center gap-2 rounded-full px-4 py-3 shadow-glass transition sm:gap-4 ${scrolled ? 'bg-white/82' : ''}`}>
    <Link to="/" className="flex min-w-max items-center gap-2 font-extrabold tracking-tight">{config?.logo ? <img src={config.logo} alt="Logo" className="h-8 w-8 rounded-full object-cover"/> : <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white">zX</span>}<span className="hidden sm:inline">{config?.nombre_tienda || 'ziX Store'}</span></Link>
    <nav className="hidden flex-1 justify-center gap-7 text-sm font-semibold lg:flex">{nav}</nav>
    <div className="relative hidden flex-1 max-w-xs md:block">{searchBox}</div>
    <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
      <button className="rounded-full p-2 hover:bg-white md:hidden" onClick={()=>{setSearchOpen(!searchOpen); setMobile(false);}} aria-label="Buscar">{searchOpen ? <X className="h-5 w-5"/> : <Search className="h-5 w-5"/>}</button>
      <Link to="/favoritos" className="relative rounded-full p-2 hover:bg-white" aria-label="Favoritos"><Heart className="h-5 w-5"/>{favorites.length>0 && <span className="absolute -right-1 -top-1 rounded-full bg-ink px-1.5 text-[10px] text-white">{favorites.length}</span>}</Link>
      <button onClick={()=>setCartOpen(true)} className="relative rounded-full p-2 hover:bg-white" aria-label="Carrito"><ShoppingBag className="h-5 w-5"/>{cart.length>0 && <span className="absolute -right-1 -top-1 rounded-full bg-ink px-1.5 text-[10px] text-white">{cart.reduce((s,i)=>s+i.qty,0)}</span>}</button>
      <button className="rounded-full p-2 hover:bg-white lg:hidden" onClick={()=>{setMobile(!mobile); setSearchOpen(false);}} aria-label="Menú">{mobile ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}</button>
    </div>
  </div>
  {searchOpen && <div className="glass mt-2 flex items-center gap-2 rounded-3xl p-3 md:hidden">{searchBox}</div>}
  {mobile && <div className="glass mt-3 flex flex-col gap-4 rounded-3xl p-5 font-semibold lg:hidden">{nav}</div>}
  </div></header>;
}