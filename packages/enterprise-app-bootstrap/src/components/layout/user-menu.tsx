"use client";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import type { AppSession } from "@/features/auth/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu({ session }: { session: AppSession }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Avatar><AvatarFallback>{session.user.initials}</AvatarFallback></Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <p className="font-semibold normal-case tracking-normal text-foreground">{session.user.name}</p>
          <p className="truncate text-xs font-normal normal-case tracking-normal text-muted-foreground">{session.user.email}</p>
          <p className="mt-1 text-xs font-medium normal-case tracking-normal text-primary">Rôle : {session.user.role}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/settings"><Settings className="size-4" />Paramètres</Link></DropdownMenuItem>
        <DropdownMenuItem><User className="size-4" />Profil</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="text-destructive"><Link href="/login"><LogOut className="size-4" />Déconnexion</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
