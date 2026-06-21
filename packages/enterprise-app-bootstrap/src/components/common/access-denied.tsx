import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./empty-state";

export function AccessDenied() {
  return (
    <EmptyState
      icon={LockKeyhole}
      title="Accès restreint"
      description="Ton rôle ne permet pas d’afficher cette section. Contacte un administrateur si cet accès est nécessaire."
      action={<Button asChild variant="outline"><Link href="/dashboard">Retour au tableau de bord</Link></Button>}
    />
  );
}
