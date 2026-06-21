export const roles = ["owner", "admin", "manager", "analyst", "member", "viewer"] as const;
export type Role = (typeof roles)[number];

export const permissions = [
  "dashboard.view",
  "work.read",
  "work.manage",
  "records.read",
  "records.write",
  "approvals.read",
  "approvals.review",
  "reports.read",
  "audit.read",
  "members.read",
  "members.manage",
  "settings.read",
  "settings.manage",
  "security.manage",
  "feature_flags.manage",
] as const;

export type Permission = (typeof permissions)[number];

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: Role;
};

export type AppSession = {
  user: SessionUser;
  organizationId: string;
  activeWorkspaceId: string;
};
