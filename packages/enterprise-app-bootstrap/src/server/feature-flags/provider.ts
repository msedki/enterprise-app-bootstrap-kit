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
  async enabled(key: string) {
    return process.env[`FLAG_${key.toUpperCase().replaceAll("-", "_")}`] === "true";
  }
}

export const serverFlags: FeatureFlagProvider = new EnvironmentFlagProvider();
