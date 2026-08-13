import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { IntroSection } from "./components/IntroSection";
import { PlateGrid } from "./components/PlateGrid";
import { Reveal } from "./components/Reveal";
import { VisualGrid } from "./components/VisualGrid";
import { fragments, independentDevelopment, intro, profile, selectedWorks } from "./data/portfolio";

export function App() {
  return (
    <div className="wrap">
      <Reveal>
        <Header name={profile.name} role={profile.role} location={profile.location} />
      </Reveal>

      <Reveal>
        <IntroSection activities={intro.activities} />
      </Reveal>

      <Reveal>
        <PlateGrid title="Selected Works" items={selectedWorks} />
      </Reveal>

      <Reveal>
        <VisualGrid
          title="Independent Development"
          description={independentDevelopment.description}
          heroCaption={independentDevelopment.heroCaption}
          heroImage={independentDevelopment.heroImage}
          heroAlt={independentDevelopment.heroAlt}
          sideItems={independentDevelopment.sideItems}
        />
      </Reveal>

      <Reveal>
        <VisualGrid
          title="Fragments"
          description={fragments.description}
          compact
          sideItems={fragments.sideItems}
        />
      </Reveal>

      <Reveal>
        <ContactSection items={profile.contact} />
      </Reveal>

      <Footer name={profile.name} year={profile.year} />
    </div>
  );
}
