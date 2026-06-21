import { PageHeader } from "@/components/common/page-header";
import { MembersTable } from "@/features/settings/members-table";
import { requirePageAccess } from "@/features/auth/require-page-access";

export const metadata = { title: "Membres et accès" };
export default async function MembersPage() {
  const denied = await requirePageAccess("members.read");
  if (denied) return denied;
  return <div className="space-y-6"><PageHeader eyebrow="IAM" title="Membres et accès" description="Invitations, rôles, workspaces et cycle de vie des accès. Les droits sont contrôlés côté serveur, jamais uniquement dans l’interface." /><MembersTable /></div>;
}
