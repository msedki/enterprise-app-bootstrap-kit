import { Download, FileSpreadsheet, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { MiniBarChart } from "@/components/common/mini-bar-chart";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requirePageAccess } from "@/features/auth/require-page-access";

export const metadata = { title: "Rapports" };
const values = [84, 91, 88, 96, 103, 117, 126, 122, 139, 146, 151, 164];
const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default async function ReportsPage() {
  const denied = await requirePageAccess("reports.read");
  if (denied) return denied;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Décision" title="Rapports" description="Indicateurs consolidés, segmentation et exports gouvernés pour les équipes métier." actions={<><Button variant="outline"><FileSpreadsheet className="size-4" />Planifier</Button><Button><Download className="size-4" />Exporter</Button></>} />
      <section className="grid gap-4 md:grid-cols-3"><StatCard label="Taux de traitement" value="96,4 %" change="+2,1 pt" changeLabel="ce trimestre" icon={TrendingUp} trend="up" /><StatCard label="Délai médian" value="3 h 18" change="-24 min" changeLabel="vs trimestre passé" icon={TrendingUp} trend="up" /><StatCard label="Exceptions ouvertes" value="37" change="-12 %" changeLabel="sur 30 jours" icon={TrendingUp} trend="up" /></section>
      <Card><CardHeader><CardTitle>Volume traité</CardTitle><CardDescription>Données de démonstration. Remplacer par votre couche analytique ou entrepôt.</CardDescription></CardHeader><CardContent><MiniBarChart values={values} labels={labels} title="Volume traité par mois" /></CardContent></Card>
      <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>Par région</CardTitle></CardHeader><CardContent className="space-y-4">{[["Europe", 68], ["Afrique du Nord", 22], ["Autres", 10]].map(([label, value]) => <div key={label as string}><div className="mb-1 flex justify-between text-sm"><span>{label}</span><span className="font-medium">{value}%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} /></div></div>)}</CardContent></Card><Card><CardHeader><CardTitle>Qualité opérationnelle</CardTitle></CardHeader><CardContent className="space-y-4">{[["Sans reprise", 92], ["Dans le SLA", 96], ["Données complètes", 89]].map(([label, value]) => <div key={label as string}><div className="mb-1 flex justify-between text-sm"><span>{label}</span><span className="font-medium">{value}%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-success" style={{ width: `${value}%` }} /></div></div>)}</CardContent></Card></div>
    </div>
  );
}
