"use client";

import { useMemo, useState } from "react";
import { Download, Search, UserRound, Workflow } from "lucide-react";
import { toast } from "sonner";
import { auditEvents } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/format";

const resultVariant = { success: "success", denied: "warning", failure: "danger" } as const;
const resultLabel = { success: "Succès", denied: "Refusé", failure: "Échec" } as const;
const maxExportRows = 5000;

export function AuditTable() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("all");
  const visible = useMemo(() => auditEvents.filter(event => {
    const haystack = `${event.actor} ${event.action} ${event.resource} ${event.resourceId} ${event.correlationId}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (result === "all" || event.result === result);
  }), [query, result]);

  function exportCsv() {
    if (visible.length > maxExportRows) {
      toast.error(`Export limité à ${maxExportRows} lignes`, { description: "Affinez les filtres ou utilisez l’export programmé pour de gros volumes." });
      return;
    }
    const header = "date,actor,action,resource,result,correlationId";
    const rows = visible.map(event => [event.occurredAt, event.actor, event.action, `${event.resource}:${event.resourceId}`, event.result, event.correlationId].map(value => `"${value}"`).join(","));
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "audit-log.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Acteur, action, ressource, corrélation…" className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={result} onValueChange={setResult}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les résultats</SelectItem>
              <SelectItem value="success">Succès</SelectItem>
              <SelectItem value="denied">Refusés</SelectItem>
              <SelectItem value="failure">Échecs</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCsv}><Download className="size-4" />Exporter</Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Acteur</TableHead><TableHead>Action</TableHead><TableHead>Ressource</TableHead><TableHead>Résultat</TableHead><TableHead>Contexte</TableHead></TableRow></TableHeader>
          <TableBody>
            {visible.map(event => (
              <TableRow key={event.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(event.occurredAt)}</TableCell>
                <TableCell><span className="inline-flex items-center gap-2 font-medium">{event.actorType === "user" ? <UserRound className="size-4 text-muted-foreground" /> : <Workflow className="size-4 text-muted-foreground" />}{event.actor}</span></TableCell>
                <TableCell><code className="rounded bg-muted px-1.5 py-0.5 text-xs">{event.action}</code></TableCell>
                <TableCell><p className="font-medium">{event.resource}</p><p className="font-mono text-xs text-muted-foreground">{event.resourceId}</p></TableCell>
                <TableCell><Badge variant={resultVariant[event.result]}>{resultLabel[event.result]}</Badge></TableCell>
                <TableCell><p className="text-sm">{event.workspace}</p><p className="font-mono text-xs text-muted-foreground">{event.correlationId}</p></TableCell>
              </TableRow>
            ))}
            {!visible.length ? <TableRow><TableCell colSpan={6} className="h-32 text-center text-muted-foreground">Aucun événement.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">Dans une application réelle, l’export et la consultation doivent eux-mêmes être journalisés et soumis à une politique de rétention.</p>
    </div>
  );
}
