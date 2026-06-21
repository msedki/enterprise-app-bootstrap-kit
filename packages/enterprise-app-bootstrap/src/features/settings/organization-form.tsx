"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  legalName: z.string().min(2, "La raison sociale est requise"),
  domain: z.string().min(3),
  locale: z.enum(["fr-FR", "en-GB", "en-US"]),
  timezone: z.string().min(1),
});
type FormValues = z.infer<typeof schema>;

export function OrganizationForm() {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "Acme Group", legalName: "Acme Group SAS", domain: "acme.example", locale: "fr-FR", timezone: "Africa/Casablanca" },
  });

  async function submit(values: FormValues) {
    await new Promise(resolve => setTimeout(resolve, 350));
    toast.success("Organisation mise à jour", { description: values.name });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="name">Nom d’affichage</Label><Input id="name" {...register("name")} aria-invalid={Boolean(errors.name)} />{errors.name ? <p className="text-xs text-destructive">{errors.name.message}</p> : null}</div>
        <div className="space-y-2"><Label htmlFor="legalName">Raison sociale</Label><Input id="legalName" {...register("legalName")} aria-invalid={Boolean(errors.legalName)} /></div>
        <div className="space-y-2"><Label htmlFor="domain">Domaine vérifié</Label><Input id="domain" {...register("domain")} /></div>
        <div className="space-y-2"><Label>Langue par défaut</Label><Select defaultValue="fr-FR" onValueChange={value => setValue("locale", value as FormValues["locale"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="fr-FR">Français (France)</SelectItem><SelectItem value="en-GB">English (UK)</SelectItem><SelectItem value="en-US">English (US)</SelectItem></SelectContent></Select></div>
        <div className="space-y-2"><Label htmlFor="timezone">Fuseau horaire</Label><Input id="timezone" {...register("timezone")} /></div>
      </div>
      <div className="flex justify-end"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Enregistrement…" : "Enregistrer"}</Button></div>
    </form>
  );
}
