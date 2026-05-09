import { Markdown } from '@storybook/addon-docs/blocks';

const patterns = import.meta.glob<string>(
  '../../../../.context/field-team/references/patterns/*.md',
  { query: '?raw', import: 'default', eager: true },
);

export function getPatternMd(name: string): string {
  const hit = Object.entries(patterns).find(([path]) => path.endsWith(`/${name}.md`));
  return hit?.[1] ?? `# ${name}\n\n_Pattern markdown not found at \`.context/field-team/references/patterns/${name}.md\`._`;
}

export function PatternDoc({ name }: { name: string }) {
  return (
    <div
      style={{
        maxWidth: 760,
        padding: '24px 32px',
        background: '#fff',
        color: '#101628',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        lineHeight: 1.55,
      }}
    >
      <Markdown>{getPatternMd(name)}</Markdown>
    </div>
  );
}
