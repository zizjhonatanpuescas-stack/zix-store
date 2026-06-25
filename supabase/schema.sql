create extension if not exists "pgcrypto";

create table if not exists categorias (
  id text primary key,
  nombre text not null,
  icono text,
  orden int default 0,
  activo boolean default true
);

create table if not exists subcategorias (
  id text primary key,
  categoria_id text references categorias(id) on delete cascade,
  nombre text not null,
  orden int default 0,
  activo boolean default true
);

create table if not exists productos (
  id text primary key default gen_random_uuid()::text,
  nombre text not null,
  descripcion text,
  precio numeric(10,2) not null default 0,
  precio_anterior numeric(10,2),
  categoria_id text references categorias(id),
  subcategoria_id text references subcategorias(id),
  imagen_principal text,
  imagenes jsonb default '[]'::jsonb,
  stock int default 0,
  nuevo boolean default false,
  oferta boolean default false,
  destacado boolean default false,
  marca text,
  activo boolean default true,
  fecha timestamptz default now()
);

create table if not exists configuracion (
  id text primary key default 'principal',
  nombre_tienda text default 'ziX Store',
  logo text,
  banner text,
  titulo_banner text,
  subtitulo_banner text,
  telefono text,
  correo text,
  facebook text,
  instagram text,
  tiktok text,
  direccion text,
  horario text,
  tema text default 'light',
  color_principal text default '#111114',
  color_secundario text default '#6d5dfc'
);

alter table categorias enable row level security;
alter table subcategorias enable row level security;
alter table productos enable row level security;
alter table configuracion enable row level security;

create policy "lectura publica categorias" on categorias for select using (activo = true);
create policy "lectura publica subcategorias" on subcategorias for select using (activo = true);
create policy "lectura publica productos" on productos for select using (activo = true);
create policy "lectura publica configuracion" on configuracion for select using (true);

-- Para producción crea una tabla/perfil de administradores y limita estas policies a usuarios autorizados.
-- Ejemplo temporal para desarrollo autenticado:
create policy "admin categorias" on categorias for all to authenticated using (true) with check (true);
create policy "admin subcategorias" on subcategorias for all to authenticated using (true) with check (true);
create policy "admin productos" on productos for all to authenticated using (true) with check (true);
create policy "admin configuracion" on configuracion for all to authenticated using (true) with check (true);

insert into configuracion (id, nombre_tienda, titulo_banner, subtitulo_banner, color_principal, color_secundario)
values ('principal', 'ziX Store', 'Accesorios premium para tu iPhone', 'Diseño elegante, protección real y tecnología lista para acompañarte cada día.', '#111114', '#6d5dfc')
on conflict (id) do nothing;
