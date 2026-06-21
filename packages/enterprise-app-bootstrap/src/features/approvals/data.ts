export type ApprovalRequest = {
  id: string;
  title: string;
  requester: string;
  submittedAt: string;
  dueAt: string;
  amount?: number;
  type: "access" | "finance" | "compliance" | "change";
  risk: "low" | "medium" | "high";
  status: "pending" | "approved" | "rejected";
  reviewers: string[];
};

export const approvalRequests: ApprovalRequest[] = [
  {
    id: "AP-2048",
    title: "Extension de plafond — Sahara Energy",
    requester: "Mina K.",
    submittedAt: "2026-06-21T08:45:00Z",
    dueAt: "2026-06-21T16:00:00Z",
    amount: 250000,
    type: "finance",
    risk: "high",
    status: "pending",
    reviewers: ["Alex Morgan", "Sofia R."],
  },
  {
    id: "AP-2047",
    title: "Accès temporaire au workspace Finance",
    requester: "Youssef A.",
    submittedAt: "2026-06-20T14:12:00Z",
    dueAt: "2026-06-22T12:00:00Z",
    type: "access",
    risk: "medium",
    status: "pending",
    reviewers: ["Alex Morgan"],
  },
  {
    id: "AP-2046",
    title: "Dérogation KYC — Meridian Health",
    requester: "Nora B.",
    submittedAt: "2026-06-20T09:30:00Z",
    dueAt: "2026-06-21T12:00:00Z",
    type: "compliance",
    risk: "high",
    status: "pending",
    reviewers: ["Sofia R.", "Legal Team"],
  },
  {
    id: "AP-2045",
    title: "Mise en production règle de routage EU",
    requester: "Sofia R.",
    submittedAt: "2026-06-19T15:20:00Z",
    dueAt: "2026-06-23T09:00:00Z",
    type: "change",
    risk: "low",
    status: "approved",
    reviewers: ["Alex Morgan"],
  },
];
