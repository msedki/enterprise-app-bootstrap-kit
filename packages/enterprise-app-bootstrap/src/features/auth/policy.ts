import { ForbiddenError, UnauthorizedError } from "@/lib/errors";
import { rolePermissions } from "./permissions";
import type { AppSession, Permission } from "./types";

export function can(session: AppSession | null, permission: Permission) {
  if (!session) return false;
  return rolePermissions[session.user.role].includes(permission);
}

export function requireSession(session: AppSession | null): asserts session is AppSession {
  if (!session) throw new UnauthorizedError();
}

export function requirePermission(
  session: AppSession | null,
  permission: Permission,
): asserts session is AppSession {
  requireSession(session);
  if (!can(session, permission)) {
    throw new ForbiddenError(`Permission requise : ${permission}`);
  }
}
