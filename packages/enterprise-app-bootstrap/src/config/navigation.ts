import {
  Activity, BarChart3, BookOpen, CheckSquare, Database, Flag,
  Gauge, ListTodo, Settings, ShieldCheck, Users,
} from "lucide-react";
import type { NavigationGroup } from "@/types/navigation";

export const navigation: NavigationGroup[] = [
  {
    label: "Pilotage",
    items: [
      { label: "Vue d’ensemble", href: "/dashboard", icon: Gauge, permission: "dashboard.view" },
      { label: "File de travail", href: "/work", icon: ListTodo, permission: "work.read", badge: "12" },
      { label: "Données", href: "/records", icon: Database, permission: "records.read" },
      { label: "Rapports", href: "/reports", icon: BarChart3, permission: "reports.read", feature: "reports" },
    ],
  },
  {
    label: "Gouvernance",
    items: [
      { label: "Approbations", href: "/approvals", icon: CheckSquare, permission: "approvals.read", feature: "approvals", badge: "4" },
      { label: "Journal d’audit", href: "/audit-log", icon: Activity, permission: "audit.read", feature: "auditLog" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Organisation", href: "/settings", icon: Settings, permission: "settings.read" },
      { label: "Membres et accès", href: "/settings/members", icon: Users, permission: "members.read" },
      { label: "Sécurité", href: "/settings/security", icon: ShieldCheck, permission: "settings.read" },
      { label: "Feature flags", href: "/settings/feature-flags", icon: Flag, permission: "feature_flags.manage", feature: "featureFlagsAdmin" },
    ],
  },
  {
    label: "Ressources",
    items: [
      { label: "Centre d’aide", href: "/help", icon: BookOpen, permission: "dashboard.view", feature: "helpCenter" },
    ],
  },
];
