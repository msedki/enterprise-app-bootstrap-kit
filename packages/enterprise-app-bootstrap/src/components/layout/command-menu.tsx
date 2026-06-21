"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { navigation } from "@/config/navigation";
import { featureConfig } from "@/config/features";
import { can } from "@/features/auth/policy";
import type { AppSession } from "@/features/auth/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function CommandMenu({
  session, open, onOpenChange,
}: {
  session: AppSession;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const items = useMemo(
    () => navigation.flatMap(group =>
      group.items
        .filter(item => can(session, item.permission) && (!item.feature || featureConfig[item.feature]))
        .map(item => ({ ...item, group: group.label })),
    ),
    [session],
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <Command>
          <CommandInput placeholder="Rechercher une page, une action…" />
          <CommandList>
            <CommandEmpty>Aucun résultat.</CommandEmpty>
            {Array.from(new Set(items.map(item => item.group))).map(group => (
              <CommandGroup key={group} heading={group}>
                {items.filter(item => item.group === group).map(item => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.href}
                      value={`${item.label} ${item.href}`}
                      onSelect={() => { router.push(item.href); onOpenChange(false); }}
                    >
                      <Icon className="size-4" />{item.label}
                      <span className="ml-auto text-xs text-muted-foreground">{item.href}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
