"use client";
import { useState } from "react";
import type { AppSession } from "@/features/auth/types";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { CommandMenu } from "./command-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function AppShell({ session, children }: { session: AppSession; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-background">
      <div className="sticky top-0 hidden h-dvh shrink-0 lg:block">
        <AppSidebar session={session} collapsed={collapsed} onToggle={() => setCollapsed(value => !value)} />
      </div>
      <div className="min-w-0 flex-1">
        <AppHeader session={session} onOpenMobileNav={() => setMobileOpen(true)} onOpenCommand={() => setCommandOpen(true)} />
        <main id="main-content" className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="left-0 top-0 h-dvh w-[min(88vw,320px)] max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 p-0">
          <AppSidebar session={session} collapsed={false} mobile onToggle={() => undefined} onNavigate={() => setMobileOpen(false)} />
        </DialogContent>
      </Dialog>
      <CommandMenu session={session} open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
