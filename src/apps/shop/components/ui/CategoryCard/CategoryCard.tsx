import './CategoryCard.css';

export type CategoryCardProps = {
  /** Single composite image URL — the blob background + product collage as one PNG / SVG.
   *  Tiles that should show a SALE badge bake the badge into the asset itself
   *  (e.g. cat-r1-1.svg) so the badge transforms together with the image. */
  image: string;
  /** Category name rendered as text below the image. */
  label: string;
  /** Click handler (usually navigates to the category PLP). */
  onClick?: () => void;
};

export function CategoryCard({ image, label, onClick }: CategoryCardProps) {
  return (
    <button type="button" className="cat-card" onClick={onClick}>
      <span className="cat-card__image">
        <img src={image} alt="" loading="lazy" draggable={false} />
      </span>
      <span className="cat-card__label">{label}</span>
    </button>
  );
}
