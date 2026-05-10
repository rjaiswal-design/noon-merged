import { ASSETS } from "../pdp-assets";

export function ProductCarousel({ title, highlightWord }: { title: string; highlightWord?: string }) {
  const products = [
    { name: 'Apple Airpods Pro 2 Wireless Earbuds', price: 'Đ899', orig: '1399', off: '33%', bestSeller: true },
    { name: 'Apple Airpods Pro 2 Wireless Earbuds', price: 'Đ899', orig: '1399', off: '33%' },
    { name: 'Apple Airpods Pro 2 Wireless Earbuds', price: 'Đ899', orig: '1399', off: '33%' },
  ];
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold leading-[19px] text-bluegray-1000">
        {highlightWord
          ? <>{title.replace(highlightWord, '')} <span className="text-accent-700">"{highlightWord}"</span></>
          : title}
      </h2>
      <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1">
        {products.map((p, i) => (
          <article key={i} className="flex w-[140px] shrink-0 flex-col gap-1.5 rounded-xl border border-bluegray-200 p-2">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-bluegray-50">
              {p.bestSeller && (
                <span className="absolute left-1 top-1 rounded bg-[#0a4f4a] px-1.5 py-0.5 text-[9px] font-bold text-white">Best Seller</span>
              )}
              <button className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.18L12 21z" stroke="#1D2539" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </button>
              <img src={ASSETS.airpods} alt="" className="h-full w-full object-contain" />
              <span className="absolute bottom-1 left-1 rounded bg-bluegray-100 px-1 text-[9px] text-bluegray-700">Ad</span>
              <button className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-md border border-bluegray-300 bg-white text-bluegray-1000">
                <span className="text-[14px] font-bold leading-none">+</span>
              </button>
            </div>
            <p className="line-clamp-2 text-[12px] leading-[15px] text-bluegray-1000">{p.name}</p>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-emerald-700 text-[12px]">★</span>
              <span className="font-semibold text-bluegray-1000">4.3</span>
              <span className="text-bluegray-600">(128)</span>
            </div>
            <div className="flex items-center gap-1 text-[12px]">
              <span className="font-bold text-bluegray-1000 line-through">{p.price}</span>
              <span className="text-bluegray-600 line-through">{p.orig}</span>
              <span className="font-semibold text-green-700">{p.off}</span>
            </div>
            <p className="flex items-center gap-1 text-[10px] text-red-700">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-red-700 text-white">↓</span>
              Lowest price in 30...
            </p>
            <span className="self-start rounded bg-[#FEEE00] px-1 py-px text-[9px] font-bold italic leading-[12px] text-bluegray-1000">express Today</span>
          </article>
        ))}
      </div>
    </section>
  );
}
