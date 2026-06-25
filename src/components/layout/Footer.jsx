import { Facebook, Instagram, Mail, MapPin, Music2, Phone } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
export default function Footer() { const { config } = useStore(); return <footer id="contacto" className="mt-24 bg-ink text-white"><div className="section grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr]">
  <div><div className="mb-4 text-3xl font-black">{config?.nombre_tienda || 'ziX Store'}</div><p className="max-w-md text-white/60">Accesorios para iPhone seleccionados con estética premium, rendimiento y actualización dinámica desde Supabase.</p></div>
  <div className="space-y-3 text-sm text-white/70"><p className="font-bold text-white">Contacto</p><a className="flex gap-2" href={`https://wa.me/${(config?.telefono||'').replace(/\D/g,'')}`}><Phone size={16}/>{config?.telefono}</a><a className="flex gap-2" href={`mailto:${config?.correo}`}><Mail size={16}/>{config?.correo}</a><p className="flex gap-2"><MapPin size={16}/>{config?.direccion}</p><p>{config?.horario}</p></div>
  <div className="space-y-3 text-sm text-white/70"><p className="font-bold text-white">Redes</p><a className="flex gap-2" href={config?.instagram}><Instagram size={16}/>Instagram</a><a className="flex gap-2" href={config?.facebook}><Facebook size={16}/>Facebook</a><a className="flex gap-2" href={config?.tiktok}><Music2 size={16}/>TikTok</a></div>
</div></footer>; }
