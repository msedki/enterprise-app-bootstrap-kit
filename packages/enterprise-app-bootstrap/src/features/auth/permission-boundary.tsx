import type { ReactNode } from "react";
import { can } from "./policy";
import type { AppSession, Permission } from "./types";

export function PermissionBoundary({
  session,
  permission,
  fallback = null,
  children,
}: {
  session: AppSession;
  permission: Permission;
  fallback?: ReactNode;
  children: ReactNode;
}) {
  return can(session, permission) ? children : fallback;
}
