# ziX Store

Tienda online profesional para accesorios de iPhone construida con React + Vite + Tailwind CSS + Supabase y lista para Cloudflare Pages.

## Funcionalidades

- Contenido dinámico desde Supabase: configuración, hero/banner, logo, categorías, subcategorías, productos, redes y WhatsApp.
- Diseño premium responsive con glassmorphism, sombras suaves, animaciones y skeleton loading.
- Catálogo con filtros por categoría, subcategoría, marca, precio, ofertas, nuevos y destacados.
- Buscador en tiempo real, favoritos y carrito persistidos en LocalStorage.
- Vista rápida, página individual de producto y secciones automáticas de ofertas/nuevos/más vendidos.
- Panel `/admin` para CRUD básico de productos, categorías, subcategorías y configuración.
- SEO base, Open Graph, favicon, robots, sitemap y `_redirects` para Cloudflare Pages.

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Configura en `.env`:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY_PUBLICA
VITE_SITE_URL=https://zix-store.pages.dev
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Variables de entorno: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL`

## Notas de seguridad

La anon key de Supabase es pública por diseño. Protege escrituras con RLS, autenticación y políticas adecuadas antes de producción. El panel admin asume que configurarás políticas Supabase para usuarios administradores.
