type LogLevel = "debug" | "info" | "warn" | "error";
type LogContext = Record<string, unknown>;

function emit(level: LogLevel, message: string, context: LogContext = {}) {
  const event = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service: "enterprise-app-bootstrap",
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? process.env.NODE_ENV,
    ...context,
  };
  const serialized = JSON.stringify(event);
  if (level === "error") console.error(serialized);
  else if (level === "warn") console.warn(serialized);
  else console.log(serialized);
}

export const logger = {
  debug: (message: string, context?: LogContext) => emit("debug", message, context),
  info: (message: string, context?: LogContext) => emit("info", message, context),
  warn: (message: string, context?: LogContext) => emit("warn", message, context),
  error: (message: string, context?: LogContext) => emit("error", message, context),
};
