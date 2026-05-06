import './CategoryCard.css';

export type CategoryCardProps = {
  /** Single composite image URL — the blob background + product collage as one PNG / SVG. */
  image: string;
  /** Category name rendered as text below the image. */
  label: string;
  /** Show a red SALE badge at the top of the card. */
  sale?: boolean;
  /** Click handler (usually navigates to the category PLP). */
  onClick?: () => void;
};

export function CategoryCard({ image, label, sale, onClick }: CategoryCardProps) {
  return (
    <button type="button" className="cat-card" onClick={onClick}>
      <span className="cat-card__image">
        {sale && <span className="cat-card__sale">SALE</span>}
        <img src={image} alt="" loading="lazy" draggable={false} />
      </span>
      <span className="cat-card__label">{label}</span>
    </button>
  );
}
