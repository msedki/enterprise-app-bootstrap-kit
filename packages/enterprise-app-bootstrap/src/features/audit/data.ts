export type AuditEvent = {
  id: string;
  occurredAt: string;
  actor: string;
  actorType: "user" | "service";
  action: string;
  resource: string;
  resourceId: string;
  workspace: string;
  result: "success" | "denied" | "failure";
  ip: string;
  correlationId: string;
};

export const auditEvents: AuditEvent[] = [
  { id: "evt_9012", occurredAt: "2026-06-21T10:32:17Z", actor: "Alex Morgan", actorType: "user", action: "approval.approve", resource: "Approval", resourceId: "AP-2045", workspace: "Europe Operations", result: "success", ip: "41.250.10.18", correlationId: "cor_31f85a" },
  { id: "evt_9011", occurredAt: "2026-06-21T10:22:43Z", actor: "rules-engine", actorType: "service", action: "record.risk_recalculated", resource: "Record", resourceId: "rec_1006", workspace: "Europe Operations", result: "success", ip: "internal", correlationId: "cor_31f848" },
  { id: "evt_9010", occurredAt: "2026-06-21T09:58:02Z", actor: "Nora B.", actorType: "user", action: "member.role_update", resource: "Membership", resourceId: "mem_018", workspace: "North Africa", result: "denied", ip: "196.200.99.11", correlationId: "cor_31f7c1" },
  { id: "evt_9009", occurredAt: "2026-06-21T09:43:28Z", actor: "Mina K.", actorType: "user", action: "record.update", resource: "Record", resourceId: "rec_1001", workspace: "Europe Operations", result: "success", ip: "105.73.22.51", correlationId: "cor_31f790" },
  { id: "evt_9008", occurredAt: "2026-06-21T08:15:10Z", actor: "sync-worker", actorType: "service", action: "integration.sync", resource: "Integration", resourceId: "int_erp_01", workspace: "Europe Operations", result: "failure", ip: "internal", correlationId: "cor_31f612" },
  { id: "evt_9007", occurredAt: "2026-06-20T17:44:36Z", actor: "Youssef A.", actorType: "user", action: "session.login", resource: "Session", resourceId: "ses_1881", workspace: "North Africa", result: "success", ip: "197.230.88.40", correlationId: "cor_31e122" },
];
