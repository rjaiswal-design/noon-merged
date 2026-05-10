import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import { fetchProductById } from '../../api/productsApi';
import type { Product } from '../../types/product';
import PdpDesign from './components/PdpDesign';

function PDPSkeleton() {
  return (
    <div
      className="pdp-skeleton"
      aria-busy="true"
      aria-label="Loading product"
      style={{
        margin: '0 auto',
        height: '100%',
        width: '100%',
        maxWidth: 375,
        background: '#F9F9FB',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 12,
      }}
    >
      <div style={{ height: 44, background: '#e6e8ef', borderRadius: 8 }} />
      <div style={{ height: 360, background: '#e6e8ef', borderRadius: 16 }} />
      <div style={{ height: 24, background: '#e6e8ef', borderRadius: 6, width: '70%' }} />
      <div style={{ height: 16, background: '#e6e8ef', borderRadius: 6, width: '50%' }} />
      <div style={{ height: 36, background: '#e6e8ef', borderRadius: 8, width: '40%' }} />
      <div style={{ height: 200, background: '#e6e8ef', borderRadius: 16, marginTop: 8 }} />
    </div>
  );
}

export default function PDPPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setProduct(undefined);
    if (!productId) {
      setProduct(null);
      return;
    }
    fetchProductById(productId).then((p) => {
      if (!cancelled) setProduct(p);
    });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  return (
    <PageTransition>
      {product === undefined ? (
        <PDPSkeleton />
      ) : (
        <PdpDesign product={product ?? undefined} />
      )}
    </PageTransition>
  );
}
