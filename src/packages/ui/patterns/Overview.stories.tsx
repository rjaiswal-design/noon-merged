import type { Meta, StoryObj } from '@storybook/react-vite';

const FILE_URL = 'https://www.figma.com/design/wFRKiKskxZ4vjIHbDVvngJ/Field-Design-System';

const CATEGORIES: Array<{ title: string; items: Array<{ name: string; node: string; figmaName: string }> }> = [
  {
    title: 'Buttons',
    items: [
      { name: 'M-Button-Primary', node: '596:201', figmaName: 'M-Button/Primary-Button' },
      { name: 'M-Button-Secondary', node: '610:188', figmaName: 'M-Button/Secondary-Button' },
      { name: 'M-Button-Secondary-Neutral', node: '944:12577', figmaName: 'M-Button/Secondary-Neutral-Button' },
      { name: 'M-Button-Neutral', node: '752:70', figmaName: 'M-Button/Neutral-Button' },
      { name: 'M-Button-Round-Neutral', node: '1304:266', figmaName: 'M-Button/Round-Neutral-Button' },
      { name: 'M-Button-Text-Blue', node: '1363:208', figmaName: 'M-Button/Text-Blue' },
      { name: 'M-Button-Text-Neutral', node: '1363:245', figmaName: 'M-Button/Text-Neutral' },
      { name: 'M-IconButton', node: '1051:10843', figmaName: 'M-IconButton' },
    ],
  },
  {
    title: 'Form controls',
    items: [
      { name: 'M-Checkbox', node: '698:11205', figmaName: 'M-Checkbox' },
      { name: 'M-Radio', node: '704:11224', figmaName: 'M-Radio' },
      { name: 'M-Toggle', node: '705:560', figmaName: 'M-Toggle' },
      { name: 'M-Input-Text', node: '1102:164105', figmaName: 'M-Input/Text' },
      { name: 'M-Input-Textarea', node: '1092:212', figmaName: 'M-Input/Textarea' },
    ],
  },
  {
    title: 'Layout & structure',
    items: [
      { name: 'M-Accordion', node: '711:11251', figmaName: 'M-Accordion' },
      { name: 'M-Divider', node: '1300:22345', figmaName: 'M-Divider' },
      { name: 'M-List-Item', node: '1204:2496', figmaName: 'M-List-Item' },
      { name: 'M-PageHeader', node: '1753:285', figmaName: 'M-PageHeader' },
      { name: 'M-ActionBar', node: '1735:119', figmaName: 'M-ActionBar' },
      { name: 'M-Bottomnav', node: '1266:21286', figmaName: 'M-Bottomnav' },
    ],
  },
  {
    title: 'Information display',
    items: [
      { name: 'M-InfoBanner-Rounded', node: '1337:69', figmaName: 'M-InfoBanner/Rounded' },
      { name: 'M-InfoBanner-Partial', node: '1339:81', figmaName: 'M-InfoBanner/Partial' },
      { name: 'M-Tooltip', node: '1499:26', figmaName: 'M-Tooltip' },
      { name: 'M-Switch', node: '969:478', figmaName: 'M-Switch' },
    ],
  },
  {
    title: 'Search & filter',
    items: [
      { name: 'M-SearchBar', node: '892:244', figmaName: 'M-SearchBar' },
      { name: 'M-SearchPill', node: '892:287', figmaName: 'M-SearchPill' },
      { name: 'M-Chip-Filter', node: '1391:41', figmaName: 'M-Chip/Filter' },
    ],
  },
  {
    title: 'Specialized',
    items: [
      { name: 'M-BillLineItem', node: '1645:264', figmaName: 'M-BillLineItem' },
      { name: 'M-BillSummary', node: '1657:92', figmaName: 'M-BillSummary' },
      { name: 'M-Rating-Badge', node: '1205:539', figmaName: 'M-Rating/Badge' },
      { name: 'M-Rating-Input', node: '1214:646', figmaName: 'M-Rating/Input' },
    ],
  },
  {
    title: 'iOS chrome',
    items: [
      { name: 'M-Status-bar', node: '1169:206', figmaName: 'M-Status bar' },
      { name: 'M-Home-bar', node: '1169:211', figmaName: 'M-Home bar' },
    ],
  },
];

function Overview() {
  const total = CATEGORIES.reduce((n, c) => n + c.items.length, 0);
  return (
    <div
      style={{
        maxWidth: 920,
        padding: '24px 32px',
        background: '#fff',
        color: '#101628',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        lineHeight: 1.55,
      }}
    >
      <h1 style={{ marginTop: 0, fontSize: 28 }}>Field Design System — M-* patterns</h1>
      <p style={{ color: '#475067' }}>
        {total} patterns from the Field DS Figma file. Pattern markdown is the spec; pick a pattern in the sidebar
        to view its anatomy, token expectations, and variants.
      </p>
      <p style={{ color: '#475067', fontSize: 13 }}>
        Source: <a href={FILE_URL}>{FILE_URL}</a>
        <br />
        Local copy: <code>.context/field-team/references/patterns/</code>
      </p>
      {CATEGORIES.map((cat) => (
        <section key={cat.title} style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 18, marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid #EAECF0' }}>
            {cat.title}
            <span style={{ color: '#666D85', fontWeight: 400, marginLeft: 8, fontSize: 13 }}>({cat.items.length})</span>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {cat.items.map((item) => (
              <li key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                <code style={{ fontSize: 12, color: '#101628' }}>{item.name}</code>
                <span style={{ color: '#666D85', fontSize: 12 }}>{item.figmaName}</span>
                <a
                  href={`${FILE_URL}?node-id=${item.node.replace(':', '-')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: 'auto', fontSize: 11, color: '#0F61FF' }}
                >
                  Figma →
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const meta: Meta<typeof Overview> = {
  title: 'Field DS Patterns/Overview',
  component: Overview,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type Story = StoryObj<typeof Overview>;

export const All: Story = {};
