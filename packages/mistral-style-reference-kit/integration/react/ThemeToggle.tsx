"use client";

import * as React from "react";

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      type="button"
      className="msr-button msr-button--outline"
      onClick={() => setDark((value) => !value)}
      aria-pressed={dark}
    >
      {dark ? "Thème clair" : "Thème sombre"}
    </button>
  );
}
