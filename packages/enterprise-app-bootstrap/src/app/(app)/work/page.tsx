import { Filter, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { WorkQueue } from "@/features/work/work-queue";
import { Button } from "@/components/ui/button";
import { requirePageAccess } from "@/features/auth/require-page-access";

export const metadata = { title: "File de travail" };
export default async function WorkPage() {
  const denied = await requirePageAccess("work.read");
  if (denied) return denied;
  return <div className="space-y-6"><PageHeader eyebrow="Exécution" title="File de travail" description="Priorisez, assignez et traitez les tâches issues des workflows métier." actions={<><Button variant="outline"><Filter className="size-4" />Vues enregistrées</Button><Button><Plus className="size-4" />Nouvelle tâche</Button></>} /><WorkQueue /></div>;
}
