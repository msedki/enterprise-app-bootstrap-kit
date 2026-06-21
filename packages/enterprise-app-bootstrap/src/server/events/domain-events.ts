export type DomainEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  name: string;
  occurredAt: string;
  aggregateType: string;
  aggregateId: string;
  organizationId: string;
  workspaceId?: string;
  correlationId: string;
  payload: TPayload;
};

export interface EventPublisher {
  publish<T extends Record<string, unknown>>(event: DomainEvent<T>): Promise<void>;
}

class ConsoleEventPublisher implements EventPublisher {
  async publish<T extends Record<string, unknown>>(event: DomainEvent<T>) {
    console.info(JSON.stringify({ level: "info", message: "domain.event", ...event }));
  }
}

// Replace with an outbox + broker adapter when delivery guarantees matter.
export const events: EventPublisher = new ConsoleEventPublisher();
