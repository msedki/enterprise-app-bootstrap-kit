import { z } from "zod";

export const createRecordSchema = z.object({
  name: z.string().trim().min(2).max(120),
  reference: z.string().trim().min(3).max(40),
  owner: z.string().trim().min(2).max(80),
  status: z.enum(["active", "pending", "blocked", "draft"]),
  risk: z.enum(["low", "medium", "high"]),
  amount: z.coerce.number().nonnegative().max(100_000_000),
});

export type CreateRecordInput = z.infer<typeof createRecordSchema>;
