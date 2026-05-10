import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import { ProductCard, NavBar, SearchIcon, StatusBar } from '@ui';
import { CategoryTabs } from './components/CategoryTabs';
import { FilterBar } from './components/FilterBar';
import { productCategories } from '../../data/categories';
import { fetchByCategory, searchProducts } from '../../api/productsApi';
import type { CategoryId, Product } from '../../types/product';
import { staggerContainer, staggerItem } from '../../lib/transitions';
import './PLP.css';

function SkelBlock({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={`plp-skel ${className ?? ''}`} style={style} />;
}

function PLPSkeleton() {
  return (
    <motion.div
      className="plp"
      aria-busy="true"
      aria-label="Loading products"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="plp__sticky">
        <StatusBar tone="dark" />
        <div className="plp-skel-header">
          <SkelBlock className="plp-skel-back" />
          <SkelBlock className="plp-skel-title" />
          <SkelBlock className="plp-skel-icon" />
          <SkelBlock className="plp-skel-icon" />
        </div>
        <div className="plp-skel-tabs">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkelBlock key={i} className="plp-skel-tab" />
          ))}
        </div>
      </div>

      <div className="plp__scroll">
        <div className="plp-skel-filters">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkelBlock key={i} className="plp-skel-chip" />
          ))}
        </div>
        <div className="plp__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="plp-skel-card" key={i}>
              <SkelBlock className="plp-skel-card-img" />
              <SkelBlock className="plp-skel-line" style={{ width: '92%' }} />
              <SkelBlock className="plp-skel-line" style={{ width: '70%' }} />
              <SkelBlock className="plp-skel-line" style={{ width: '45%' }} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PLPPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') ?? '';
  const categoryParam = (searchParams.get('category') ?? 'all') as CategoryId | 'all';

  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | 'all'>(categoryParam);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  // Sync the active tab when the URL changes (back/forward).
  useEffect(() => {
    setActiveCategoryId(categoryParam);
  }, [categoryParam]);

  // Fetch whenever query or active category changes. A search query takes
  // precedence over the category filter.
  useEffect(() => {
    let cancelled = false;
    setProducts(null);

    const load = async () => {
      if (queryParam) {
        const { results, total } = await searchProducts(queryParam);
        if (cancelled) return;
        setProducts(results);
        setTotal(total);
      } else {
        const list = await fetchByCategory(activeCategoryId);
        if (cancelled) return;
        setProducts(list);
        setTotal(list.length);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [queryParam, activeCategoryId]);

  const title = useMemo(() => {
    if (queryParam) return `Results for "${queryParam}"`;
    if (activeCategoryId === 'all') return 'All products';
    const match = productCategories.find((c) => c.id === activeCategoryId);
    return match?.label ?? 'All products';
  }, [queryParam, activeCategoryId]);

  function toggleFilter(id: string) {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  if (products === null) {
    return (
      <PageTransition>
        <PLPSkeleton />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="plp">
        <div className="plp__sticky">
          <StatusBar tone="dark" />
          <NavBar
            title={title}
            onBack={() => navigate(-1)}
            actions={[
              { icon: <SearchIcon size={24} color="var(--grey-900)" />, label: 'Search', onClick: () => navigate('/search') },
            ]}
          />
          {!queryParam && (
            <CategoryTabs
              categories={productCategories}
              activeId={activeCategoryId}
              onSelect={(id) => setActiveCategoryId(id as CategoryId | 'all')}
            />
          )}
        </div>

        <div className="plp__scroll">
          <FilterBar activeFilters={activeFilters} onChipClick={toggleFilter} />
          {products.length === 0 ? (
            <div className="plp__empty" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--grey-700)' }}>
              No products found{queryParam ? ` for "${queryParam}"` : ''}.
            </div>
          ) : (
            <>
              {queryParam && total !== null && (
                <p style={{ padding: '8px 16px 0', color: 'var(--grey-700)', fontSize: 13 }}>
                  {total} {total === 1 ? 'result' : 'results'}
                </p>
              )}
              <motion.div
                className="plp__grid"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {products.map((product) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
