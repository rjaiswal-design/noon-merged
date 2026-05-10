import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import { searchSuggestions, searchProducts, type SearchSuggestion } from '../../api/productsApi';
import './Search.css';

export default function SearchPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [total, setTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced fuzzy lookup. 150 ms of quiet before we hit the index — feels
  // instant while keeping the user's typing animation smooth.
  useEffect(() => {
    const t = setTimeout(async () => {
      const [s, r] = await Promise.all([
        searchSuggestions(q),
        q.trim() ? searchProducts(q) : Promise.resolve({ results: [], total: 0 }),
      ]);
      setSuggestions(s);
      setTotal(r.total);
    }, 150);
    return () => clearTimeout(t);
  }, [q]);

  const submit = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <PageTransition>
    <div className="search-page">
      <div className="search-bar">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate(-1)}
          className="search-bar__icon"
        >
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
            <path d="M7.5 1 1.5 7l6 6" stroke="#1D2539" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          value={q}
          placeholder="Search noon"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(q); }}
          className="search-bar__input"
        />
        {q && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => { setQ(''); inputRef.current?.focus(); }}
            className="search-bar__icon"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="#1D2539" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <p className="search-page__label">{q.trim() ? 'Search results' : 'Trending searches'}</p>

      <ul className="search-results">
        {suggestions.map((s, i) => (
          <li key={`${s.productId}-${i}`}>
            <button
              type="button"
              onClick={() => submit(s.query)}
              className="search-result"
            >
              <span className="search-result__text">
                <strong>{s.highlight}</strong>{s.rest}
              </span>
              {s.context ? (
                <span className="search-result__chip">{s.context}</span>
              ) : null}
            </button>
          </li>
        ))}
        {q.trim() && (
          <li>
            <button
              type="button"
              onClick={() => submit(q)}
              className="search-result search-result--all"
            >
              <span className="search-result__text">
                <span className="search-result__all-line">Show all results for <strong>{q.trim()}</strong></span>
                <span className="search-result__all-count">{total} {total === 1 ? 'result' : 'results'}</span>
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="search-result__use">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#666D85" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </div>
    </PageTransition>
  );
}
