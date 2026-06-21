import { Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { RecordsTable } from "@/features/records/records-table";
import { Button } from "@/components/ui/button";
import { getSession } from "@/features/auth/session";
import { requirePageAccess } from "@/features/auth/require-page-access";
import { listRecords } from "@/server/services/records.service";

export const metadata = { title: "Données" };
export default async function RecordsPage() {
  const denied = await requirePageAccess("records.read");
  if (denied) return denied;
  const records = await listRecords(await getSession());
  return <div className="space-y-6"><PageHeader eyebrow="Référentiel" title="Données métier" description="Exemple de vue tabulaire entreprise : recherche, filtres, tri, sélection, pagination et actions contextualisées." actions={<><Button variant="outline"><Download className="size-4" />Exporter</Button><Button><Plus className="size-4" />Créer</Button></>} /><RecordsTable data={records} /></div>;
}
