import { ArrowRight, Building2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config/app";

export const metadata = { title: "Connexion" };
export default function LoginPage() {
  return (
    <main id="main-content" className="grid min-h-dvh lg:grid-cols-2">
      <section className="surface-grid hidden border-r bg-muted/20 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary font-black text-primary-foreground">{appConfig.shortName}</div><span className="font-bold">{appConfig.name}</span></div>
        <div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Application entreprise</p><h1 className="mt-4 text-balance text-4xl font-black tracking-tight">Un shell cohérent pour vos opérations, données et décisions.</h1><div className="mt-8 grid gap-4">{[[ShieldCheck, "Contrôles d’accès et audit"], [Building2, "Organisation et workspaces"], [LockKeyhole, "Connexion fédérée et MFA"]].map(([Icon, label]) => { const C = Icon as typeof ShieldCheck; return <div key={label as string} className="flex items-center gap-3 text-sm font-medium"><div className="rounded-lg bg-background p-2 shadow-sm"><C className="size-4 text-primary" /></div>{label as string}</div>; })}</div></div>
        <p className="text-xs text-muted-foreground">Starter de démonstration — remplacez le mode mock par votre IdP OIDC/SAML.</p>
      </section>
      <section className="flex items-center justify-center p-6"><Card className="w-full max-w-md"><CardHeader><CardTitle>Connexion à {appConfig.name}</CardTitle><CardDescription>Le starter utilise une session mock par défaut afin de montrer les écrans immédiatement.</CardDescription></CardHeader><CardContent className="space-y-4"><Button asChild size="lg" className="w-full"><a href="/dashboard">Continuer avec la session de démonstration <ArrowRight className="size-4" /></a></Button><Button variant="outline" size="lg" className="w-full" disabled>Connexion SSO</Button><p className="text-center text-xs leading-5 text-muted-foreground">En production, l’authentification doit être déléguée à un fournisseur d’identité et validée côté serveur.</p></CardContent></Card></section>
    </main>
  );
}
