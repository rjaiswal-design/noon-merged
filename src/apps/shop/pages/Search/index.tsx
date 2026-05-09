import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import './Search.css';

type Suggestion = {
  query: string;
  highlight: string;
  rest: string;
  context?: string;
};

const TRENDING: Suggestion[] = [
  { query: 'maybelline', highlight: 'May', rest: 'belline', context: 'in beauty' },
  { query: 'iphone',     highlight: 'iPh', rest: 'one',     context: 'in electronics' },
  { query: 'pringles',   highlight: 'Prin', rest: 'gles',   context: 'in grocery' },
  { query: 'foundation', highlight: 'Foun', rest: 'dation', context: 'in beauty' },
];

function buildSuggestions(q: string): Suggestion[] {
  const trimmed = q.trim();
  if (!trimmed) return TRENDING;
  const cap = trimmed[0].toUpperCase() + trimmed.slice(1);
  return [
    { query: trimmed, highlight: cap, rest: '' },
    { query: `${trimmed} for kids`,        highlight: cap, rest: ' for kids',         context: 'in board games' },
    { query: `${trimmed} for adults`,      highlight: cap, rest: ' for adults',       context: 'in board games' },
    { query: `${trimmed} for PlayStation 5`, highlight: cap, rest: ' for PlayStation 5', context: 'in electronics' },
    { query: `${trimmed}ir controller`,    highlight: cap, rest: 'ir controller',     context: 'in electronics' },
  ];
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  const suggestions = buildSuggestions(q);
  const total = q.trim() ? 747 : 0;

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
          <li key={`${s.query}-${i}`}>
            <button
              type="button"
              onClick={() => submit(s.query)}
              className="search-result"
            >
              <span className="search-result__text">
                <strong>{s.highlight}</strong>{s.rest}
              </span>
              {i === 0 && q.trim() ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="search-result__use">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#666D85" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : s.context ? (
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
                <span className="search-result__all-count">{total} results</span>
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
