import "server-only";
import { createRecordSchema, type CreateRecordInput } from "@/features/records/schemas";
import { requirePermission } from "@/features/auth/policy";
import type { AppSession } from "@/features/auth/types";
import { logger } from "@/lib/observability/logger";
import { recordsRepository } from "../repositories/records.repository";

export async function listRecords(session: AppSession | null) {
  requirePermission(session, "records.read");
  return recordsRepository.list(session.activeWorkspaceId);
}

export async function createRecord(session: AppSession | null, input: CreateRecordInput) {
  requirePermission(session, "records.write");
  const parsed = createRecordSchema.parse(input);
  const record = await recordsRepository.create(session.activeWorkspaceId, parsed);
  logger.info("record.created", {
    recordId: record.id,
    actorId: session.user.id,
    workspaceId: session.activeWorkspaceId,
  });
  return record;
}
