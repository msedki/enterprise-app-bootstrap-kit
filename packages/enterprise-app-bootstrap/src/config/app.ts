export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Enterprise Console",
  shortName: "EC",
  description: "Socle généralisable pour applications d’entreprise.",
  supportEmail: "support@example.com",
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? "development",
  commandShortcut: "⌘K",
} as const;
