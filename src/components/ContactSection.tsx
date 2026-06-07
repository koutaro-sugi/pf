import type { ContactItem } from "../data/portfolio";
import { useState } from "react";

type ContactSectionProps = {
  items: ContactItem[];
};

export function ContactSection({ items }: ContactSectionProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");

  async function handleCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setCopyState("success");
      window.setTimeout(() => {
        setCopied((current) => (current === value ? null : current));
        setCopyState((current) => (current === "success" ? "idle" : current));
      }, 1400);
    } catch {
      setCopied(null);
      setCopyState("error");
      window.setTimeout(() => {
        setCopyState((current) => (current === "error" ? "idle" : current));
      }, 1800);
    }
  }

  return (
    <section className="contact">
      <dl>
        {items.map((item) => (
          <div className="contact-row" key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.action === "copy" ? (
                <button className="contact-copy" type="button" onClick={() => void handleCopy(item.value)}>
                  {copied === item.value ? "Copied" : item.value}
                </button>
              ) : item.href ? (
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {item.value}
                </a>
              ) : (
                item.value
              )}
              {item.action === "copy" && copyState !== "idle" ? (
                <span className={`contact-feedback contact-feedback-${copyState}`}>
                  {copyState === "success" ? "Copied to clipboard" : "Copy failed"}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
