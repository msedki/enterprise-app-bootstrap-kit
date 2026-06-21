import { BookOpen, LifeBuoy, MessageCircleQuestion, Search, ShieldQuestion } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Centre d’aide" };
const resources = [
  { icon: BookOpen, title: "Guides métier", text: "Procédures, rôles et scénarios de bout en bout." },
  { icon: ShieldQuestion, title: "Sécurité et accès", text: "MFA, SSO, rôles, sessions et demandes d’accès." },
  { icon: MessageCircleQuestion, title: "Questions fréquentes", text: "Réponses courtes aux problèmes récurrents." },
  { icon: LifeBuoy, title: "Support", text: "Escalade, incident et demande d’assistance." },
];
export default function HelpPage() {
  return <div className="space-y-8"><PageHeader eyebrow="Ressources" title="Centre d’aide" description="La documentation est un module de l’application : contextualisée, recherchable et reliée aux workflows de support." /><div className="surface-grid rounded-2xl border p-6 sm:p-10"><div className="mx-auto max-w-2xl text-center"><h2 className="text-xl font-bold">Comment pouvons-nous vous aider ?</h2><div className="relative mt-5"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" /><Input className="h-12 bg-background pl-12" placeholder="Rechercher un guide, une procédure, une erreur…" /></div></div></div><section className="grid gap-4 md:grid-cols-2">{resources.map(resource => { const Icon = resource.icon; return <Card key={resource.title} className="transition-shadow hover:shadow-md"><CardContent className="flex gap-4 p-5"><div className="rounded-xl bg-primary/10 p-3 text-primary"><Icon className="size-5" /></div><div><h2 className="font-semibold">{resource.title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{resource.text}</p><Button variant="link" className="mt-2 h-auto p-0">Consulter</Button></div></CardContent></Card>; })}</section></div>;
}
