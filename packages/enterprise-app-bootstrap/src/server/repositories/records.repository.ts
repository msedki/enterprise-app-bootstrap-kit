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
    void workspaceId;
    return structuredClone(records);
  }

  async create(workspaceId: string, input: CreateRecordInput) {
    void workspaceId;
    return {
      id: `rec_${Date.now()}`,
      ...input,
      updatedAt: new Date().toISOString(),
    };
  }
}

export const recordsRepository: RecordsRepository = new InMemoryRecordsRepository();
