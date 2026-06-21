export type RecordStatus = "active" | "pending" | "blocked" | "draft";

export type BusinessRecord = {
  id: string;
  name: string;
  reference: string;
  owner: string;
  status: RecordStatus;
  risk: "low" | "medium" | "high";
  updatedAt: string;
  amount: number;
};
