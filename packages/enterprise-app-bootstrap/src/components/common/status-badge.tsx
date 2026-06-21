import { Badge } from "@/components/ui/badge";

const variants = {
  active: ["success", "Actif"],
  pending: ["warning", "En attente"],
  blocked: ["danger", "Bloqué"],
  draft: ["secondary", "Brouillon"],
  approved: ["success", "Approuvé"],
  rejected: ["danger", "Rejeté"],
  running: ["info", "En cours"],
  completed: ["success", "Terminé"],
} as const;

export type StatusKey = keyof typeof variants;

export function StatusBadge({ status }: { status: StatusKey }) {
  const [variant, label] = variants[status];
  return <Badge variant={variant}>{label}</Badge>;
}
