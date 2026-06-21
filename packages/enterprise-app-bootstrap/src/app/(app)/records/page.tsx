import { Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { RecordsTable } from "@/features/records/records-table";
import { records } from "@/features/records/data";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Données" };
export default function RecordsPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Référentiel" title="Données métier" description="Exemple de vue tabulaire entreprise : recherche, filtres, tri, sélection, pagination et actions contextualisées." actions={<><Button variant="outline"><Download className="size-4" />Exporter</Button><Button><Plus className="size-4" />Créer</Button></>} /><RecordsTable data={records} /></div>;
}
