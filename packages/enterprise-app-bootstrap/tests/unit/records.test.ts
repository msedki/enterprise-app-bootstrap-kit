import { describe, expect, it } from "vitest";
import { createRecordSchema } from "@/features/records/schemas";

describe("validation d'un dossier métier", () => {
  it("normalise et accepte une entrée valide", () => {
    const value = createRecordSchema.parse({
      name: "  Atlas Distribution  ",
      reference: "CL-2026-011",
      owner: "Mina K.",
      status: "active",
      risk: "low",
      amount: "120000",
    });
    expect(value.name).toBe("Atlas Distribution");
    expect(value.amount).toBe(120000);
  });

  it("refuse un montant négatif", () => {
    expect(() => createRecordSchema.parse({
      name: "Atlas",
      reference: "CL-001",
      owner: "Mina K.",
      status: "active",
      risk: "low",
      amount: -1,
    })).toThrow();
  });
});
