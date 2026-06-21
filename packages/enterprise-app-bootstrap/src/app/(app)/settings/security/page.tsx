import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { SecurityControls } from "@/features/settings/security-controls";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Sécurité" };
export default function SecurityPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Sécurité" title="Contrôles de sécurité" description="Paramètres de démonstration pour l’authentification, les sessions, le réseau et les actions sensibles." /><Card><CardHeader><div className="flex items-center gap-3"><div className="rounded-lg bg-primary/10 p-2 text-primary"><ShieldCheck className="size-5" /></div><div><CardTitle>Politique d’accès</CardTitle><CardDescription>À relier à votre IdP, votre moteur de politiques et vos procédures de secours.</CardDescription></div></div></CardHeader><CardContent><SecurityControls /></CardContent></Card></div>;
}
