"use client";

import { useState } from "react";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialMembers = [
  { id: "usr_01", name: "Alex Morgan", email: "alex.morgan@example.com", initials: "AM", role: "admin", workspace: "Europe Operations", status: "active" },
  { id: "usr_02", name: "Mina K.", email: "mina.k@example.com", initials: "MK", role: "manager", workspace: "Europe Operations", status: "active" },
  { id: "usr_03", name: "Youssef A.", email: "youssef.a@example.com", initials: "YA", role: "analyst", workspace: "North Africa", status: "active" },
  { id: "usr_04", name: "Sofia R.", email: "sofia.r@example.com", initials: "SR", role: "manager", workspace: "Europe Operations", status: "active" },
  { id: "usr_05", name: "Nora B.", email: "nora.b@example.com", initials: "NB", role: "member", workspace: "North Africa", status: "invited" },
];

export function MembersTable() {
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState("");
  const visible = members.filter(member => `${member.name} ${member.email} ${member.role}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Rechercher un membre…" className="pl-9" /></div>
        <Button onClick={() => toast.info("Brancher ici le workflow d’invitation") }><Plus className="size-4" />Inviter</Button>
      </div>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader><TableRow><TableHead>Membre</TableHead><TableHead>Rôle</TableHead><TableHead>Workspace</TableHead><TableHead>État</TableHead><TableHead className="w-14"><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader>
          <TableBody>{visible.map(member => (
            <TableRow key={member.id}>
              <TableCell><div className="flex items-center gap-3"><Avatar><AvatarFallback>{member.initials}</AvatarFallback></Avatar><div><p className="font-medium">{member.name}</p><p className="text-xs text-muted-foreground">{member.email}</p></div></div></TableCell>
              <TableCell><Select defaultValue={member.role} onValueChange={role => { setMembers(current => current.map(item => item.id === member.id ? { ...item, role } : item)); toast.success("Rôle modifié"); }}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="manager">Manager</SelectItem><SelectItem value="analyst">Analyste</SelectItem><SelectItem value="member">Membre</SelectItem><SelectItem value="viewer">Lecteur</SelectItem></SelectContent></Select></TableCell>
              <TableCell>{member.workspace}</TableCell>
              <TableCell><Badge variant={member.status === "active" ? "success" : "warning"}>{member.status === "active" ? "Actif" : "Invité"}</Badge></TableCell>
              <TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /><span className="sr-only">Actions</span></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Voir le profil</DropdownMenuItem><DropdownMenuItem>Réinitialiser les sessions</DropdownMenuItem><DropdownMenuItem className="text-destructive">Suspendre</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </div>
    </div>
  );
}
