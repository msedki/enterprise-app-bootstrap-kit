export type Job<TPayload extends Record<string, unknown> = Record<string, unknown>> = {
  name: string;
  payload: TPayload;
  organizationId: string;
  workspaceId?: string;
  correlationId: string;
  idempotencyKey?: string;
};

export interface JobQueue {
  enqueue<T extends Record<string, unknown>>(job: Job<T>): Promise<{ jobId: string }>;
}

class InProcessJobQueue implements JobQueue {
  async enqueue<T extends Record<string, unknown>>(job: Job<T>) {
    const jobId = crypto.randomUUID();
    console.info(JSON.stringify({ level: "info", message: "job.enqueued", jobId, ...job }));
    return { jobId };
  }
}

// Development adapter only. Use a durable queue and dead-letter strategy in production.
export const jobs: JobQueue = new InProcessJobQueue();
