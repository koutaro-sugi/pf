import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="work-section">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      {description ? <p className="section-description">{description}</p> : null}
      {children}
    </section>
  );
}
