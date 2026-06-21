export type WorkItem = {
  id: string;
  title: string;
  type: string;
  priority: "low" | "medium" | "high";
  owner: string;
  due: string;
  status: "running" | "pending" | "blocked";
};

export const workItems: WorkItem[] = [
  { id: "WK-1208", title: "Valider le dossier Atlas Distribution", type: "Revue", priority: "high", owner: "Alex Morgan", due: "Aujourd’hui, 16:00", status: "running" },
  { id: "WK-1207", title: "Compléter les pièces Meridian Health", type: "Conformité", priority: "high", owner: "Mina K.", due: "Aujourd’hui, 18:00", status: "blocked" },
  { id: "WK-1206", title: "Rapprochement Northwind Retail", type: "Finance", priority: "medium", owner: "Youssef A.", due: "Demain, 10:00", status: "pending" },
  { id: "WK-1205", title: "Revue trimestrielle des règles", type: "Gouvernance", priority: "low", owner: "Sofia R.", due: "24 juin", status: "pending" },
];
