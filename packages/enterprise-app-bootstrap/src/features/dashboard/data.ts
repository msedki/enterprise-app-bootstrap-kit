import type { Activity } from "@/components/common/activity-feed";

export const dashboardMetrics = {
  activeRecords: 12840,
  workItems: 312,
  approvalSla: 94.2,
  monthlyVolume: 1840000,
};

export const monthlyActivity = [64, 78, 71, 86, 94, 89, 108, 116, 121, 132, 128, 144];
export const monthlyLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export const recentActivities: Activity[] = [
  { id: "a1", type: "completed", actor: "Mina K.", action: "a terminé", target: "Revue conformité Q2", at: "2026-06-21T09:20:00Z" },
  { id: "a2", type: "changed", actor: "Youssef A.", action: "a modifié", target: "Règle de routage Europe", at: "2026-06-21T08:05:00Z" },
  { id: "a3", type: "invited", actor: "Alex Morgan", action: "a invité", target: "Nora B. dans Operations", at: "2026-06-20T16:40:00Z" },
  { id: "a4", type: "completed", actor: "Sofia R.", action: "a approuvé", target: "Demande AP-2048", at: "2026-06-20T13:10:00Z" },
];
