import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { OrganizationForm } from "@/features/settings/organization-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requirePageAccess } from "@/features/auth/require-page-access";

export const metadata = { title: "Organisation" };
export default async function SettingsPage() {
  const denied = await requirePageAccess("settings.read");
  if (denied) return denied;
  return <div className="space-y-6"><PageHeader eyebrow="Administration" title="Organisation" description="Paramètres communs, conventions régionales et identité de l’organisation." /><Card><CardHeader><div className="flex items-center gap-3"><div className="rounded-lg bg-primary/10 p-2 text-primary"><Building2 className="size-5" /></div><div><CardTitle>Profil organisationnel</CardTitle><CardDescription>Ces valeurs sont des exemples et doivent être persistées côté serveur.</CardDescription></div></div></CardHeader><CardContent><OrganizationForm /></CardContent></Card></div>;
}
