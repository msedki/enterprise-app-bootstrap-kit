import * as React from "react";
import { ArrowRightIcon } from "../../icons/react/PixelIcons";

export function ProductCard({
  title,
  description,
  href,
  accent,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="msr-card"
      style={{ "--card-accent": accent } as React.CSSProperties}
    >
      <div className="msr-card__top">
        <span className="msr-card__mark">{icon}</span>
        <span className="msr-card__arrow">
          <ArrowRightIcon className="msr-icon" />
        </span>
      </div>
      <h3 className="msr-card__title">{title}</h3>
      <p className="msr-card__text">{description}</p>
    </a>
  );
}
