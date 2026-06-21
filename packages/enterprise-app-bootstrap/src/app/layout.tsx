import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { appConfig } from "@/config/app";

export const metadata: Metadata = {
  title: { default: appConfig.name, template: `%s · ${appConfig.name}` },
  description: appConfig.description,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0">Aller au contenu</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
