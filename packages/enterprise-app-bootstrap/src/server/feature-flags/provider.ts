import "server-only";

export type FlagContext = {
  userId?: string;
  organizationId: string;
  workspaceId?: string;
  attributes?: Record<string, string | number | boolean>;
};

export interface FeatureFlagProvider {
  enabled(key: string, context: FlagContext): Promise<boolean>;
}

class EnvironmentFlagProvider implements FeatureFlagProvider {
  async enabled(key: string, context: FlagContext) {
    const flagName = key.toUpperCase().replaceAll("-", "_");
    const orgOverride = process.env[`FLAG_${flagName}_ORG_${context.organizationId.toUpperCase()}`];
    if (orgOverride !== undefined) return orgOverride === "true";
    return process.env[`FLAG_${flagName}`] === "true";
  }
}

export const serverFlags: FeatureFlagProvider = new EnvironmentFlagProvider();
