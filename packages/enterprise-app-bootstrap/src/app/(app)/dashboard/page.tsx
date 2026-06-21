import { BarChart3, CheckCircle2, Database, ListTodo, Plus, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { MiniBarChart } from "@/components/common/mini-bar-chart";
import { ActivityFeed } from "@/components/common/activity-feed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardMetrics, monthlyActivity, monthlyLabels, recentActivities } from "@/features/dashboard/data";
import { formatCurrency, formatNumber } from "@/lib/format";

export const metadata = { title: "Vue d’ensemble" };

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Pilotage" title="Vue d’ensemble" description="Une lecture opérationnelle des volumes, risques, décisions et activités qui nécessitent une attention." actions={<><Button variant="outline"><BarChart3 className="size-4" />Exporter</Button><Button><Plus className="size-4" />Créer un dossier</Button></>} />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicateurs clés">
        <StatCard label="Dossiers actifs" value={formatNumber(dashboardMetrics.activeRecords)} change="+8,2 %" changeLabel="sur 30 jours" icon={Database} trend="up" />
        <StatCard label="Éléments en file" value={formatNumber(dashboardMetrics.workItems)} change="-4,1 %" changeLabel="vs semaine passée" icon={ListTodo} trend="down" />
        <StatCard label="SLA d’approbation" value={`${dashboardMetrics.approvalSla} %`} change="+1,6 pt" changeLabel="ce mois" icon={CheckCircle2} trend="up" />
        <StatCard label="Volume mensuel" value={formatCurrency(dashboardMetrics.monthlyVolume)} change="+12,4 %" changeLabel="vs mois passé" icon={ShieldCheck} trend="up" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <Card><CardHeader><CardTitle>Activité mensuelle</CardTitle><CardDescription>Évolution agrégée des opérations traitées.</CardDescription></CardHeader><CardContent><MiniBarChart values={monthlyActivity} labels={monthlyLabels} title="Activité opérationnelle par mois" /></CardContent></Card>
        <Card><CardHeader><CardTitle>Activité récente</CardTitle><CardDescription>Événements métier utiles, distincts du journal d’audit technique.</CardDescription></CardHeader><CardContent><ActivityFeed items={recentActivities} /></CardContent></Card>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[{ title: "4 approbations critiques", text: "Deux demandes dépassent 75 % de leur SLA.", href: "/approvals" }, { title: "3 intégrations dégradées", text: "ERP EU et deux webhooks nécessitent une revue.", href: "/audit-log" }, { title: "8 contrôles à revoir", text: "Revue trimestrielle de la politique d’accès.", href: "/settings/security" }].map(item => <Card key={item.title} className="transition-shadow hover:shadow-md"><CardContent className="p-5"><h2 className="font-semibold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p><Button asChild variant="link" className="mt-2 h-auto p-0"><a href={item.href}>Ouvrir la vue</a></Button></CardContent></Card>)}
      </section>
    </div>
  );
}
