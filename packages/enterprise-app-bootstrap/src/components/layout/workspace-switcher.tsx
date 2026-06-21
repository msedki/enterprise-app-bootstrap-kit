"use client";
import { useState } from "react";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { workspaces } from "@/config/workspaces";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WorkspaceSwitcher({ initialWorkspaceId }: { initialWorkspaceId: string }) {
  const [workspaceId, setWorkspaceId] = useState(initialWorkspaceId);
  const current = workspaces.find(item => item.id === workspaceId) ?? workspaces[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto w-full justify-start px-2 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Building2 className="size-4" /></div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold">{current.name}</p>
            <p className="truncate text-xs text-muted-foreground">{current.region} · {current.plan}</p>
          </div>
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Espaces de travail</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map(workspace => (
          <DropdownMenuItem key={workspace.id} onClick={() => setWorkspaceId(workspace.id)}>
            <Building2 className="size-4" />
            <div className="min-w-0 flex-1">
              <p className="truncate">{workspace.name}</p>
              <p className="text-xs text-muted-foreground">{workspace.region} · {workspace.plan}</p>
            </div>
            {workspace.id === current.id ? <Check className="size-4 text-primary" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
