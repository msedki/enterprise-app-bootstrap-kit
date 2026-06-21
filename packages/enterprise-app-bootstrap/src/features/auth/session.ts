import "server-only";
import { roles, type AppSession, type Role } from "./types";

function resolveMockRole(): Role {
  const candidate = process.env.MOCK_ROLE;
  return roles.includes(candidate as Role) ? (candidate as Role) : "admin";
}

export async function getSession(): Promise<AppSession | null> {
  if (process.env.AUTH_MODE === "disabled") return null;

  return {
    user: {
      id: "usr_alex_morgan",
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      initials: "AM",
      role: resolveMockRole(),
    },
    organizationId: "org_acme",
    activeWorkspaceId: "ws_europe",
  };
}
