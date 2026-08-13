type IntroSectionProps = {
  activities: string[];
};

function splitLead(line: string) {
  const index = line.indexOf(":");
  if (index === -1) {
    return { lead: line, tail: "" };
  }

  return {
    lead: line.slice(0, index + 1),
    tail: line.slice(index + 1).trim(),
  };
}

export function IntroSection({ activities }: IntroSectionProps) {
  return (
    <section className="intro">
      <div className="intro-group">
        {activities.map((line) => {
          const { lead, tail } = splitLead(line);
          return (
            <p className="intro-line intro-line-secondary" key={line}>
              <span className="intro-lead">{lead}</span>
              {tail ? <span className="intro-tail">{tail}</span> : null}
            </p>
          );
        })}
      </div>
    </section>
  );
}
