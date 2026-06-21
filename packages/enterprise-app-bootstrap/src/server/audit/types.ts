export type AuditWrite = {
  actorId: string;
  organizationId: string;
  workspaceId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  result: "success" | "denied" | "failure";
  correlationId: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export interface AuditSink {
  write(event: AuditWrite): Promise<void>;
}
