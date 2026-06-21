"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { appConfig } from "@/config/app";
import { featureConfig } from "@/config/features";
import { navigation } from "@/config/navigation";
import { can } from "@/features/auth/policy";
import type { AppSession } from "@/features/auth/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function AppSidebar({
  session, collapsed, onToggle, mobile = false, onNavigate,
}: {
  session: AppSession;
  collapsed: boolean;
  onToggle: () => void;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width]",
      collapsed && !mobile ? "w-20" : "w-72",
    )}>
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-sm font-black text-primary-foreground">{appConfig.shortName}</div>
        {!collapsed || mobile ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{appConfig.name}</p>
            <p className="truncate text-xs text-sidebar-muted">{appConfig.environment}</p>
          </div>
        ) : null}
        {!mobile ? (
          <Button variant="ghost" size="icon" className="ml-auto text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground" onClick={onToggle} aria-label={collapsed ? "Déployer la navigation" : "Réduire la navigation"}>
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </Button>
        ) : null}
      </div>

      <div className="px-3 py-3">{!collapsed || mobile ? <WorkspaceSwitcher initialWorkspaceId={session.activeWorkspaceId} /> : null}</div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label="Navigation principale">
        {navigation.map(group => {
          const visibleItems = group.items.filter(item => can(session, item.permission) && (!item.feature || featureConfig[item.feature]));
          if (!visibleItems.length) return null;
          return (
            <div key={group.label} className="mb-5">
              {!collapsed || mobile ? <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-muted">{group.label}</p> : null}
              <ul className="space-y-1">
                {visibleItems.map(item => {
                  const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        title={collapsed && !mobile ? item.label : undefined}
                        className={cn(
                          "group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                          collapsed && !mobile && "justify-center px-0",
                        )}
                      >
                        <Icon className="size-[18px] shrink-0" />
                        {!collapsed || mobile ? (
                          <>
                            <span className="min-w-0 flex-1 truncate">{item.label}</span>
                            {item.badge ? <Badge variant={active ? "default" : "secondary"} className="px-1.5">{item.badge}</Badge> : null}
                          </>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        {!collapsed || mobile ? (
          <div className="rounded-lg bg-sidebar-accent/60 p-3">
            <p className="text-xs font-semibold">Environnement maîtrisé</p>
            <p className="mt-1 text-xs leading-5 text-sidebar-muted">RBAC, journalisation et contrôles de sécurité sont intégrés au socle.</p>
          </div>
        ) : <div className="mx-auto size-2 rounded-full bg-success" title="Système opérationnel" />}
      </div>
    </aside>
  );
}
