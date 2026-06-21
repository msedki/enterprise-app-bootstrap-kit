import { describe, expect, it } from "vitest";
import { recordsRepository } from "@/server/repositories/records.repository";

describe("isolation multi-tenant du référentiel de données", () => {
  it("ne retourne que les dossiers du workspace demandé", async () => {
    const europe = await recordsRepository.list("ws_europe");
    const northAfrica = await recordsRepository.list("ws_north_africa");

    expect(europe.length).toBeGreaterThan(0);
    expect(northAfrica.length).toBeGreaterThan(0);
    expect(europe.every(record => record.workspaceId === "ws_europe")).toBe(true);
    expect(northAfrica.every(record => record.workspaceId === "ws_north_africa")).toBe(true);
    expect(europe.some(record => northAfrica.some(other => other.id === record.id))).toBe(false);
  });

  it("attache le workspace courant à un dossier créé", async () => {
    const created = await recordsRepository.create("ws_sandbox", {
      name: "Test Co",
      reference: "CL-TEST-001",
      owner: "Test Owner",
      status: "active",
      risk: "low",
      amount: 1000,
    });

    expect(created.workspaceId).toBe("ws_sandbox");
    expect(created.id).not.toBe("");
  });

  it("ne retourne rien pour un workspace inconnu", async () => {
    const result = await recordsRepository.list("ws_unknown");
    expect(result).toEqual([]);
  });
});
