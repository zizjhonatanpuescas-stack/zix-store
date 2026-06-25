import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import AdminPage from './admin/AdminPage.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import QuickViewModal from './components/product/QuickViewModal.jsx';
import Seo from './components/common/Seo.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-mist text-ink selection:bg-ink selection:text-white">
      <Seo />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
    </div>
  );
}
