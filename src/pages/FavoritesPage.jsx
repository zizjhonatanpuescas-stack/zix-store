import ProductGrid from '../components/product/ProductGrid';
import Seo from '../components/common/Seo';
import { useStore } from '../context/StoreContext';
export default function FavoritesPage() { const { productos, favorites } = useStore(); const items = productos.filter(p=>favorites.includes(p.id)); return <section className="section min-h-screen pt-32"><Seo title="Favoritos"/><h1 className="mb-8 text-4xl font-black">Favoritos</h1><ProductGrid products={items}/></section>; }
