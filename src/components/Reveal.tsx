import type { PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`reveal${visible ? " in" : ""}`} ref={ref}>
      {children}
    </div>
  );
}
