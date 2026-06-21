"use client";

import { useState } from "react";
import { FlaskConical, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const flags = [
  { key: "reports-v2", label: "Rapports V2", description: "Nouvelle expérience de reporting et exports asynchrones.", environment: "production", enabled: false, owner: "Data Platform" },
  { key: "bulk-actions", label: "Actions en masse", description: "Mise à jour contrôlée de plusieurs dossiers.", environment: "production", enabled: true, owner: "Core Product" },
  { key: "ai-assist", label: "Assistant opérateur", description: "Résumés et suggestions assistées, toujours validées par un humain.", environment: "staging", enabled: false, owner: "AI Enablement" },
  { key: "fine-grained-rbac", label: "RBAC granulaire", description: "Politiques de ressources et scopes par workspace.", environment: "production", enabled: true, owner: "Security" },
];

export function FeatureFlags() {
  const [state, setState] = useState(() => Object.fromEntries(flags.map(flag => [flag.key, flag.enabled])));
  return (
    <div className="space-y-4">
      <div className="divide-y rounded-xl border">
        {flags.map(flag => (
          <div key={flag.key} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="rounded-lg bg-muted p-2.5"><FlaskConical className="size-5 text-muted-foreground" /></div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><p className="font-medium">{flag.label}</p><Badge variant="outline">{flag.environment}</Badge><code className="text-xs text-muted-foreground">{flag.key}</code></div>
              <p className="mt-1 text-sm text-muted-foreground">{flag.description}</p><p className="mt-1 text-xs text-muted-foreground">Owner : {flag.owner}</p>
            </div>
            <Switch checked={Boolean(state[flag.key])} onCheckedChange={checked => { setState(current => ({ ...current, [flag.key]: checked })); toast.success(`${flag.label} ${checked ? "activé" : "désactivé"}`); }} aria-label={flag.label} />
          </div>
        ))}
      </div>
      <div className="flex justify-end"><Button variant="outline" onClick={() => setState(Object.fromEntries(flags.map(flag => [flag.key, flag.enabled])))}><RotateCcw className="size-4" />Réinitialiser</Button></div>
    </div>
  );
}
