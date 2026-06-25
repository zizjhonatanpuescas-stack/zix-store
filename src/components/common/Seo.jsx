import { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
export default function Seo({ title, description }) {
  const { config } = useStore();
  useEffect(() => {
    const name = config?.nombre_tienda || 'ziX Store';
    document.title = title ? `${title} | ${name}` : `${name} | Accesorios premium para iPhone`;
    const desc = description || config?.subtitulo_banner || 'Tienda online premium de accesorios para iPhone.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
  }, [title, description, config]);
  return null;
}
