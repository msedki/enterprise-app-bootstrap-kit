import type { ReactNode } from "react";
import { AccessDenied } from "@/components/common/access-denied";
import { can } from "./policy";
import { getSession } from "./session";
import type { Permission } from "./types";

export async function requirePageAccess(permission: Permission): Promise<ReactNode | null> {
  const session = await getSession();
  if (!session || !can(session, permission)) return <AccessDenied />;
  return null;
}
