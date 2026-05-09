import './hub.css'

const apps = [
  { slug: 'shop',          path: '/',              title: 'Shop',           tagline: 'Storefront, PLP, PDP, cart, checkout' },
  { slug: 'share-address', path: '/share-address', title: 'Share Address',  tagline: 'Address bottom sheet flows' },
  { slug: 'one-flows',     path: '/one-flows',     title: 'noon One',       tagline: 'Membership, sharing, account flows' },
  { slug: 'wishlist',      path: '/wishlist',      title: 'Wishlist',       tagline: 'Collections drawer & multi-select' },
]

export default function Hub() {
  return (
    <div className="hub">
      <header className="hub__header">
        <h1>noon — merged</h1>
        <p>Pick a sub-app to open.</p>
      </header>
      <ul className="hub__grid">
        {apps.map((a) => (
          <li key={a.slug}>
            <button
              type="button"
              onClick={() => { window.location.assign(a.path) }}
              className="hub__card"
            >
              <h2>{a.title}</h2>
              <p>{a.tagline}</p>
              <span className="hub__cta">Open →</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
