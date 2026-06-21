"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main id="main-content" className="grid min-h-[70dvh] place-items-center p-6"><div className="max-w-lg text-center"><div className="mx-auto grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive"><AlertTriangle className="size-6" /></div><h1 className="mt-4 text-2xl font-bold">Une erreur est survenue</h1><p className="mt-2 text-sm text-muted-foreground">L’incident doit être corrélé côté serveur. Référence : {error.digest ?? "non disponible"}.</p><Button className="mt-6" onClick={reset}>Réessayer</Button></div></main>; }
