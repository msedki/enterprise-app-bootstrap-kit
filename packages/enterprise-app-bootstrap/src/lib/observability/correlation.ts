export const correlationHeader = "x-correlation-id";

export function resolveCorrelationId(headers: Headers) {
  const incoming = headers.get(correlationHeader)?.trim();
  return incoming && incoming.length <= 128 ? incoming : crypto.randomUUID();
}
