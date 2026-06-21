import "server-only";
import { records } from "@/features/records/data";
import type { BusinessRecord } from "@/features/records/types";
import type { CreateRecordInput } from "@/features/records/schemas";

export interface RecordsRepository {
  list(workspaceId: string): Promise<BusinessRecord[]>;
  create(workspaceId: string, input: CreateRecordInput): Promise<BusinessRecord>;
}

class InMemoryRecordsRepository implements RecordsRepository {
  async list(workspaceId: string) {
    return structuredClone(records.filter(record => record.workspaceId === workspaceId));
  }

  async create(workspaceId: string, input: CreateRecordInput) {
    return {
      id: `rec_${crypto.randomUUID()}`,
      workspaceId,
      ...input,
      updatedAt: new Date().toISOString(),
    };
  }
}

export const recordsRepository: RecordsRepository = new InMemoryRecordsRepository();
