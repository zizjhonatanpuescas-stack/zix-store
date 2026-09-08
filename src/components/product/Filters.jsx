import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
export default function Filters({ marcas, filters, setFilters, subcategorias }) {
  const [open, setOpen] = useState(false);
  const inputs = <div className="space-y-4">
    <select className="input" value={filters.subcategoria} onChange={e=>setFilters({...filters, subcategoria:e.target.value})}><option value="all">Todos los modelos</option>{subcategorias.map(s=><option key={s.id} value={s.id}>{s.nombre}</option>)}</select>
    <select className="input" value={filters.marca} onChange={e=>setFilters({...filters, marca:e.target.value})}><option value="all">Todas las marcas</option>{marcas.map(m=><option key={m} value={m}>{m}</option>)}</select>
    <input className="input" type="number" placeholder="Precio máximo" value={filters.precioMax} onChange={e=>setFilters({...filters, precioMax:e.target.value})}/>
    {[['oferta','Ofertas'],['nuevo','Nuevos'],['destacado','Más vendidos']].map(([key,label])=><label key={key} className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={filters[key]} onChange={e=>setFilters({...filters,[key]:e.target.checked})}/>{label}</label>)}
    <button className="btn-secondary w-full" onClick={()=>setFilters({categoria:'all', subcategoria:'all', marca:'all', precioMax:'', oferta:false, nuevo:false, destacado:false, q:''})}>Limpiar</button>
  </div>;
  return <>
    <div className="lg:hidden">
      <button onClick={()=>setOpen(!open)} className="btn-secondary mb-4 w-full"><SlidersHorizontal className="mr-2 h-4 w-4"/>{open ? 'Ocultar filtros' : 'Mostrar filtros'}</button>
      {open && <aside className="glass mb-6 rounded-[2rem] p-5">{inputs}</aside>}
    </div>
    <aside className="glass sticky top-28 hidden h-max rounded-[2rem] p-5 lg:block"><h3 className="mb-4 text-lg font-black">Filtros</h3>{inputs}</aside>
  </>;
}