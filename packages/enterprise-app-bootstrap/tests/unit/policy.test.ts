import { describe, expect, it } from "vitest";
import { can, requirePermission } from "@/features/auth/policy";
import type { AppSession } from "@/features/auth/types";
import { ForbiddenError } from "@/lib/errors";

function session(role: AppSession["user"]["role"]): AppSession {
  return {
    user: { id: "usr_test", name: "Test", email: "test@example.com", initials: "TT", role },
    organizationId: "org_test",
    activeWorkspaceId: "ws_test",
  };
}

describe("politique d'autorisation", () => {
  it("autorise un administrateur à gérer les paramètres", () => {
    expect(can(session("admin"), "settings.manage")).toBe(true);
  });

  it("refuse à un viewer la gestion des membres", () => {
    expect(can(session("viewer"), "members.manage")).toBe(false);
    expect(() => requirePermission(session("viewer"), "members.manage")).toThrow(ForbiddenError);
  });

  it("refuse toute permission sans session", () => {
    expect(can(null, "dashboard.view")).toBe(false);
  });
});
