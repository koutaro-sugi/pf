type FooterProps = {
  name: string;
  year: string;
};

export function Footer({ name, year }: FooterProps) {
  return (
    <footer className="site-footer">
      <span>{name}</span>
      <span>{year}</span>
    </footer>
  );
}
