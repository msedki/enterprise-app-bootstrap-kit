export const featureConfig = {
  reports: true,
  approvals: true,
  auditLog: true,
  helpCenter: true,
  featureFlagsAdmin: true,
} as const;

export type FeatureKey = keyof typeof featureConfig;
