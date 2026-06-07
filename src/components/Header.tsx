type HeaderProps = {
  name: string;
  role: string;
  location: string;
};

export function Header({ name, role, location }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-name">{name}</div>
      <div className="site-role">{role}</div>
      <div className="site-location">{location}</div>
    </header>
  );
}
