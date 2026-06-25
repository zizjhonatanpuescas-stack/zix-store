import ProductCard from './ProductCard';
export default function ProductGrid({ products }) { if (!products.length) return <div className="rounded-[2rem] bg-white p-10 text-center text-black/50">No hay productos con estos filtros.</div>; return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>; }
