import { SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ApprovalList } from "@/features/approvals/approval-list";
import { Button } from "@/components/ui/button";
import { requirePageAccess } from "@/features/auth/require-page-access";

export const metadata = { title: "Approbations" };
export default async function ApprovalsPage() {
  const denied = await requirePageAccess("approvals.read");
  if (denied) return denied;
  return <div className="space-y-6"><PageHeader eyebrow="Gouvernance" title="Approbations" description="Décisions à plusieurs niveaux, échéances, risque, séparation des responsabilités et trace de validation." actions={<Button variant="outline"><SlidersHorizontal className="size-4" />Règles d’approbation</Button>} /><ApprovalList /></div>;
}
