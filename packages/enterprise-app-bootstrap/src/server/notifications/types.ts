export type Notification = {
  recipientId: string;
  channel: "in_app" | "email" | "webhook";
  template: string;
  data: Record<string, string | number | boolean>;
  correlationId: string;
};

export interface NotificationSender {
  send(notification: Notification): Promise<void>;
}
