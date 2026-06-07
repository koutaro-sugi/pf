import type { VisualItem } from "../data/portfolio";
import { Section } from "./Section";

type VisualGridProps = {
  title: string;
  description: string;
  heroCaption?: string;
  heroImage?: string;
  heroAlt?: string;
  sideItems: VisualItem[];
  compact?: boolean;
};

export function VisualGrid({
  title,
  description,
  heroCaption,
  heroImage,
  heroAlt,
  sideItems,
  compact = false,
}: VisualGridProps) {
  return (
    <Section title={title} description={description}>
      <div className="visual-grid">
        {heroCaption ? (
          <div className={`visual-card visual-card-main${heroImage ? " has-image" : ""}`} data-caption={heroCaption}>
            {heroImage ? (
              <img
                alt={heroAlt ?? heroCaption}
                className="media-image"
                src={`${import.meta.env.BASE_URL}${heroImage}`}
              />
            ) : (
              <span className="placeholder-text">Image placeholder</span>
            )}
          </div>
        ) : null}
        <div className={compact ? "visual-row visual-row-compact" : "visual-row"}>
          {sideItems.map((item) => (
            <div
              className={`visual-card visual-card-small${item.image ? " has-image" : ""}`}
              data-caption={item.caption}
              key={item.caption}
            >
              {item.image ? (
                <img
                  alt={item.alt ?? item.caption}
                  className="media-image"
                  src={`${import.meta.env.BASE_URL}${item.image}`}
                />
              ) : (
                <span className="placeholder-text">{item.placeholder}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
