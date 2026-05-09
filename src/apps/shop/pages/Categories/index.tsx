import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import { SearchIcon, StatusBar } from '@ui';
import { CategoryCard } from '../../components/ui/CategoryCard';
import { homeCategories } from '../../data/categories';
import { staggerContainer, staggerItem } from '../../lib/transitions';
import './Categories.css';

const PAGE_SIZE = 18;

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCount((c) => c + PAGE_SIZE);
        }
      },
      { rootMargin: '240px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = Array.from(
    { length: count },
    (_, i) => homeCategories[i % homeCategories.length],
  );

  return (
    <PageTransition>
      <div className="categories-page">
        <div className="categories-page__sticky">
          <StatusBar tone="dark" />
          <header className="categories-page__header">
            <h1 className="categories-page__title">Categories</h1>
            <button
              type="button"
              className="categories-page__action"
              aria-label="Search"
              onClick={() => navigate('/search')}
            >
              <SearchIcon size={24} color="var(--grey-900)" />
            </button>
          </header>
        </div>

        <div className="categories-page__scroll">
          <motion.div
            className="categories-page__grid"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {items.map((c, i) => (
              <motion.div
                key={i}
                className="categories-page__cell"
                variants={staggerItem}
              >
                <CategoryCard
                  image={c.image}
                  label={c.label}
                  onClick={() => navigate('/shop')}
                />
              </motion.div>
            ))}
          </motion.div>
          <div
            ref={sentinelRef}
            className="categories-page__sentinel"
            aria-hidden="true"
          />
        </div>
      </div>
    </PageTransition>
  );
}
