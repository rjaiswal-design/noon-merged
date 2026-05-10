import { ASSETS } from "../pdp-assets";

export function RatingsReviews() {
  const summaryBullets = [
    'The portrait mode includes a fantastic wide-angle',
    'Users appreciate the overall performance of phone.',
    'Enjoy the wide-angle capability while using portrait a fantastic wide-angle',
    'Users appreciate the overall performance of this phone.',
  ];
  const reviews = [
    { name: 'John Anderson', stars: 4, when: '8 days ago', body: 'If the camera had the wide angle feature in the portrait mode. If the camera has more fe..', helpful: 15 },
    { name: 'John Anderson', stars: 5, when: '6 months ago', body: 'If the camera had the wide angle feature in the portrait mode. If the camera has more fewer features than than the last one it will be worse better than others.', helpful: 14 },
  ];
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-[15px] font-semibold leading-[19px] text-bluegray-1000">Ratings & Reviews</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-[24px] font-bold leading-7 text-bluegray-1000">4.8</span>
          <span className="flex gap-0.5 text-emerald-700 text-[18px]">★★★★<span className="text-bluegray-300">★</span></span>
        </div>
        <p className="flex items-center gap-1 text-[12px] leading-4 text-bluegray-600">
          Avg. rating based on 64 reviews from trusted sources
          <img src={ASSETS.info} alt="" className="h-3 w-3" />
        </p>
      </div>

      <div className="rounded-xl bg-purple-50 p-3 flex flex-col gap-1.5">
        <p className="flex items-center gap-1 text-[13px] font-semibold text-bluegray-1000">
          64 reviews, summarised by noon AI
          <span className="text-purple-700">✦</span>
        </p>
        <ul className="flex flex-col gap-1 pl-2">
          {summaryBullets.map((b) => (
            <li key={b} className="flex w-full items-start gap-1 text-[13px] leading-[18px] text-bluegray-1000">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-bluegray-1000" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-bluegray-1000">Photo Reviews (64)</h3>
        <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1">
          {[ASSETS.airpods, ASSETS.adThumb, ASSETS.airpods, ASSETS.adThumb].map((img, i) => (
            <div key={i} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-bluegray-100">
              <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-bluegray-1000">Top Reviews (64)</h3>
        {reviews.map((r, i) => (
          <article key={i} className="flex flex-col gap-2 rounded-xl border border-bluegray-200 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-bluegray-1000">{r.name}</span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                <img src={ASSETS.verified} alt="" className="h-3 w-3" />
                Verified Buy
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-bluegray-600">
              <span className="text-emerald-700 text-[12px]">
                {Array.from({length: r.stars}).map((_, j) => <span key={j}>★</span>)}
                <span className="text-bluegray-300">{Array.from({length: 5 - r.stars}).map((_, j) => <span key={j}>★</span>)}</span>
              </span>
              <span>·</span>
              <span>{r.when}</span>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-bluegray-700">
              <span>Mac OS</span>
              <span>·</span>
              <span>8 GB RAM</span>
              <span>·</span>
              <span>Internal Version</span>
              <span>·</span>
              <span>256 GB</span>
            </div>
            <div className="text-[11px] text-bluegray-700">
              Dual core memory <span className="font-semibold text-accent-700">View product &gt;</span>
            </div>
            <p className="text-[13px] font-semibold text-bluegray-1000">This is simply amazing!</p>
            <p className="text-[12px] leading-[16px] text-bluegray-700">
              {r.body} <span className="font-semibold text-accent-700">{i === 0 ? 'More' : 'Less'}</span>
            </p>
            <p className="text-[12px] font-semibold text-accent-700">Translate to عربي</p>
            <div className="flex gap-1.5">
              {[ASSETS.airpods, ASSETS.adThumb].map((img, j) => (
                <div key={j} className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-bluegray-100">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <button type="button" className="self-start flex items-center gap-1 rounded-full border border-bluegray-300 px-2.5 py-1 text-[11px] font-medium text-bluegray-700">
              <span>👍</span> Helpful ({r.helpful})
            </button>
          </article>
        ))}
        <button type="button" className="mx-auto mt-1 flex items-center gap-1 text-[14px] font-semibold text-accent-700">
          All customer reviews <img src={ASSETS.miniChevronRight} alt="" className="h-3 w-3" />
        </button>
      </div>
    </section>
  );
}
