import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { AuditTable } from "@/features/audit/audit-table";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Journal d’audit" };
export default function AuditLogPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Traçabilité" title="Journal d’audit" description="Événements immuables destinés à la sécurité, à la conformité et aux investigations." actions={<Badge variant="success"><ShieldCheck className="mr-1 size-3.5" />Rétention 365 jours</Badge>} /><AuditTable /></div>;
}
