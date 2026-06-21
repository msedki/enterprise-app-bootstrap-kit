"use client";

import { useMemo, useState } from "react";
import { Check, Clock3, MessageSquareText, ShieldAlert, X } from "lucide-react";
import { toast } from "sonner";
import { approvalRequests, type ApprovalRequest } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/common/status-badge";
import { formatCurrency, formatDate } from "@/lib/format";

const typeLabels = {
  access: "Accès",
  finance: "Finance",
  compliance: "Conformité",
  change: "Changement",
} as const;
const riskVariants = { low: "success", medium: "warning", high: "danger" } as const;
const riskLabels = { low: "Faible", medium: "Moyen", high: "Élevé" } as const;

function ApprovalCard({ request, onDecision }: { request: ApprovalRequest; onDecision: (id: string, decision: "approved" | "rejected") => void }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{request.id}</span>
              <Badge variant="outline">{typeLabels[request.type]}</Badge>
              <Badge variant={riskVariants[request.risk]}><ShieldAlert className="mr-1 size-3" />Risque {riskLabels[request.risk]}</Badge>
              <StatusBadge status={request.status} />
            </div>
            <h3 className="mt-3 text-base font-semibold">{request.title}</h3>
          </div>
          {request.status === "pending" ? (
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={() => onDecision(request.id, "rejected")}><X className="size-4" />Rejeter</Button>
              <Button size="sm" onClick={() => onDecision(request.id, "approved")}><Check className="size-4" />Approuver</Button>
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4">
        <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Demandeur</p><p className="mt-1 text-sm font-medium">{request.requester}</p></div>
        <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Échéance</p><p className="mt-1 inline-flex items-center gap-1.5 text-sm"><Clock3 className="size-4 text-muted-foreground" />{formatDate(request.dueAt)}</p></div>
        <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Relecteurs</p><p className="mt-1 text-sm">{request.reviewers.join(", ")}</p></div>
        <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Impact</p><p className="mt-1 text-sm font-semibold">{request.amount ? formatCurrency(request.amount) : "Configuration"}</p></div>
        <div className="sm:col-span-2 xl:col-span-4">
          <Button variant="ghost" size="sm" className="-ml-3 text-muted-foreground"><MessageSquareText className="size-4" />Ajouter un commentaire</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ApprovalList() {
  const [items, setItems] = useState(approvalRequests);
  const [filter, setFilter] = useState("pending");
  const visible = useMemo(() => filter === "all" ? items : items.filter(item => item.status === filter), [filter, items]);

  function decide(id: string, decision: "approved" | "rejected") {
    setItems(current => current.map(item => item.id === id ? { ...item, status: decision } : item));
    toast.success(decision === "approved" ? "Demande approuvée" : "Demande rejetée", { description: id });
  }

  return (
    <div className="space-y-4">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="pending">À traiter</TabsTrigger>
          <TabsTrigger value="approved">Approuvées</TabsTrigger>
          <TabsTrigger value="rejected">Rejetées</TabsTrigger>
          <TabsTrigger value="all">Toutes</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-4">
        {visible.map(request => <ApprovalCard key={request.id} request={request} onDecision={decide} />)}
        {!visible.length ? <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">Aucune demande dans cette vue.</div> : null}
      </div>
    </div>
  );
}
