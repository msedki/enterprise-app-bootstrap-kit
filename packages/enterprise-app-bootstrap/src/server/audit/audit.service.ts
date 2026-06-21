import "server-only";
import type { AuditSink, AuditWrite } from "./types";
import { logger } from "@/lib/observability/logger";

class StructuredLogAuditSink implements AuditSink {
  async write(event: AuditWrite) {
    logger.info("audit.event", event);
  }
}

// Replace with an append-only store or managed audit service in production.
export const audit: AuditSink = new StructuredLogAuditSink();
