import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import SmoothCorners from '@ui/SmoothCorners';
import './index.css';

const HomePage     = lazy(() => import('./pages/Home'));
const PLPPage      = lazy(() => import('./pages/PLP'));
const PDPPage      = lazy(() => import('./pages/PDP'));
const CartPage     = lazy(() => import('./pages/Cart'));
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const AccountPage  = lazy(() => import('./pages/Account'));
const SearchPage   = lazy(() => import('./pages/Search'));

export default function App() {
  return (
    <SmoothCorners radius={20} className="app-frame">
      <Suspense fallback={null}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index                      element={<HomePage />} />
            <Route path="search"              element={<SearchPage />} />
            <Route path="shop"                element={<PLPPage />} />
            <Route path="shop/:category"      element={<PLPPage />} />
            <Route path="product/:productId"  element={<PDPPage />} />
            <Route path="cart"                element={<CartPage />} />
            <Route path="checkout"            element={<CheckoutPage />} />
            <Route path="account"             element={<AccountPage />} />
          </Route>
        </Routes>
      </Suspense>
    </SmoothCorners>
  );
}
