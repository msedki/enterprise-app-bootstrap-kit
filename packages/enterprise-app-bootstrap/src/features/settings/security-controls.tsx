"use client";

import { useState } from "react";
import { KeyRound, LockKeyhole, ShieldCheck, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const controls = [
  { id: "mfa", title: "MFA obligatoire", description: "Impose un second facteur à tous les membres.", icon: Smartphone, defaultChecked: true },
  { id: "sso", title: "SSO uniquement", description: "Bloque les connexions par mot de passe hors comptes de secours.", icon: KeyRound, defaultChecked: false },
  { id: "ip", title: "Restrictions réseau", description: "Applique les listes d’adresses IP autorisées par workspace.", icon: ShieldCheck, defaultChecked: true },
  { id: "stepup", title: "Réauthentification sensible", description: "Demande un step-up auth pour les actions critiques.", icon: LockKeyhole, defaultChecked: true },
];

export function SecurityControls() {
  const [values, setValues] = useState<Record<string, boolean>>(() => Object.fromEntries(controls.map(control => [control.id, control.defaultChecked])));
  return (
    <div className="space-y-5">
      <div className="divide-y rounded-xl border">
        {controls.map(control => {
          const Icon = control.icon;
          return (
            <div key={control.id} className="flex gap-4 p-4 sm:items-center">
              <div className="rounded-lg bg-muted p-2.5"><Icon className="size-5 text-muted-foreground" /></div>
              <div className="min-w-0 flex-1"><p className="font-medium">{control.title}</p><p className="mt-1 text-sm text-muted-foreground">{control.description}</p></div>
              <Switch checked={values[control.id]} onCheckedChange={checked => setValues(current => ({ ...current, [control.id]: checked }))} aria-label={control.title} />
            </div>
          );
        })}
      </div>
      <div className="grid gap-4 rounded-xl border p-4 md:grid-cols-2">
        <div><p className="text-sm font-medium">Durée maximale de session</p><p className="mt-1 text-xs text-muted-foreground">Temps avant nouvelle authentification complète.</p></div>
        <Select defaultValue="8"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1 heure</SelectItem><SelectItem value="8">8 heures</SelectItem><SelectItem value="12">12 heures</SelectItem><SelectItem value="24">24 heures</SelectItem></SelectContent></Select>
      </div>
      <div className="flex justify-end"><Button onClick={() => toast.success("Politique de sécurité enregistrée")}>Enregistrer la politique</Button></div>
    </div>
  );
}
