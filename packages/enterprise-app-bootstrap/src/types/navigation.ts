import type { LucideIcon } from "lucide-react";
import type { FeatureKey } from "@/config/features";
import type { Permission } from "@/features/auth/types";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  permission: Permission;
  feature?: FeatureKey;
  badge?: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};
