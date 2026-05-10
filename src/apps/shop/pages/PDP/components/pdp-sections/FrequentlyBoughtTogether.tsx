import { ASSETS } from "../pdp-assets";

export function FrequentlyBoughtTogether() {
  const items = [
    { name: 'USB C Plug, 735 Charger (Nano I...', price: 'Đ110', img: ASSETS.airpods, brand: '' },
    { name: '60W USB Type C Cable Nylon Bra...', price: 'Đ25', img: ASSETS.adThumb, brand: 'UGREEN' },
    { name: 'Anker 737 Power Bank (PowerCor...', price: 'Đ325', img: ASSETS.airpods, brand: '' },
  ];
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold leading-[19px] text-bluegray-1000">Frequently bought together</h2>
      <div className="flex items-stretch gap-1.5">
        {items.map((item, idx) => (
          <div key={item.name} className="flex flex-1 items-stretch gap-1">
            <div className="flex flex-1 flex-col gap-1">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-bluegray-50">
                <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-700">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item.brand && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-[#0a4f4a] px-1 py-px text-[8px] font-bold text-white">{item.brand}</span>
                )}
              </div>
              <p className="line-clamp-2 text-[11px] leading-[14px] text-bluegray-1000">{item.name}</p>
              <p className="text-[13px] font-bold leading-4 text-bluegray-1000">{item.price}</p>
              <span className="self-start rounded bg-[#FEEE00] px-1 py-px text-[9px] font-bold italic leading-[12px] text-bluegray-1000">express Today</span>
            </div>
            {idx < items.length - 1 && (
              <span className="flex shrink-0 items-center text-bluegray-400 text-[14px] font-bold">+</span>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="mt-1 h-10 w-full rounded-[10px] border border-solid border-noon-blue text-[14px] font-semibold text-noon-blue">
        Buy all for Đ460
      </button>
    </section>
  );
}
