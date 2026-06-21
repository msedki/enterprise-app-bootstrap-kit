"use client";
import { Bell, Menu, Search } from "lucide-react";
import type { AppSession } from "@/features/auth/types";
import { appConfig } from "@/config/app";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { UserMenu } from "./user-menu";

export function AppHeader({
  session, onOpenMobileNav, onOpenCommand,
}: {
  session: AppSession;
  onOpenMobileNav: () => void;
  onOpenCommand: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMobileNav} aria-label="Ouvrir la navigation"><Menu className="size-5" /></Button>
      <button type="button" onClick={onOpenCommand} className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border bg-muted/40 px-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted sm:max-w-md">
        <Search className="size-4" /><span className="truncate">Rechercher dans {appConfig.name}</span>
        <kbd className="ml-auto hidden rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline">{appConfig.commandShortcut}</kbd>
      </button>
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4" /><Badge className="absolute -right-1 -top-1 grid size-4 place-items-center p-0 text-[9px]">3</Badge>
        </Button>
        <ThemeToggle />
        <UserMenu session={session} />
      </div>
    </header>
  );
}
