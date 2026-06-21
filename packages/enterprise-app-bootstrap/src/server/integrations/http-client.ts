import "server-only";
import { correlationHeader } from "@/lib/observability/correlation";

export type IntegrationRequest = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
  correlationId: string;
  idempotencyKey?: string;
  timeoutMs?: number;
};

export async function integrationFetch<T>({
  url,
  method = "GET",
  body,
  token,
  correlationId,
  idempotencyKey,
  timeoutMs = 10_000,
}: IntegrationRequest): Promise<T> {
  const response = await fetch(url, {
    method,
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      [correlationHeader]: correlationId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Integration failure: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
