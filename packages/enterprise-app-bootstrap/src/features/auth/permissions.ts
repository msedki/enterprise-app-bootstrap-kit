import type { Permission, Role } from "./types";

const allPermissions: Permission[] = [
  "dashboard.view", "work.read", "work.manage", "records.read", "records.write",
  "approvals.read", "approvals.review", "reports.read", "audit.read",
  "members.read", "members.manage", "settings.read", "settings.manage",
  "security.manage", "feature_flags.manage",
];

export const rolePermissions: Record<Role, readonly Permission[]> = {
  owner: allPermissions,
  admin: allPermissions,
  manager: [
    "dashboard.view", "work.read", "work.manage", "records.read", "records.write",
    "approvals.read", "approvals.review", "reports.read", "audit.read",
    "members.read", "settings.read",
  ],
  analyst: ["dashboard.view", "work.read", "records.read", "reports.read", "audit.read"],
  member: ["dashboard.view", "work.read", "records.read", "records.write", "approvals.read"],
  viewer: ["dashboard.view", "work.read", "records.read", "reports.read"],
};
