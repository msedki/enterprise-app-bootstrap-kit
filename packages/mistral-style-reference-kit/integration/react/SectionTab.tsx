import * as React from "react";
import { CopyIcon, CheckIcon } from "../../icons/react/PixelIcons";

export function SectionTab({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div id={id} className="msr-section-tab">
      <h2 className="msr-section-tab__label">{children}</h2>
      <button className="msr-button msr-button--ghost" onClick={copyLink}>
        {copied ? "Copié" : "Copier le lien"}
        {copied ? <CheckIcon className="msr-icon" /> : <CopyIcon className="msr-icon" />}
      </button>
    </div>
  );
}
