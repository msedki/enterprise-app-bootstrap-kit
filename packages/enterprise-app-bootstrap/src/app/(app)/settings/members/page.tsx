import { PageHeader } from "@/components/common/page-header";
import { MembersTable } from "@/features/settings/members-table";

export const metadata = { title: "Membres et accès" };
export default function MembersPage() {
  return <div className="space-y-6"><PageHeader eyebrow="IAM" title="Membres et accès" description="Invitations, rôles, workspaces et cycle de vie des accès. Les droits sont contrôlés côté serveur, jamais uniquement dans l’interface." /><MembersTable /></div>;
}
