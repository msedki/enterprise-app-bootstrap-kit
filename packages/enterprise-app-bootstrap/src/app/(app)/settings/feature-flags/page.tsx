import { PageHeader } from "@/components/common/page-header";
import { FeatureFlags } from "@/features/settings/feature-flags";
import { requirePageAccess } from "@/features/auth/require-page-access";

export const metadata = { title: "Feature flags" };
export default async function FeatureFlagsPage() {
  const denied = await requirePageAccess("feature_flags.manage");
  if (denied) return denied;
  return <div className="space-y-6"><PageHeader eyebrow="Delivery" title="Feature flags" description="Activation progressive, expérimentation contrôlée et mécanisme de repli. Les changements doivent être journalisés." /><FeatureFlags /></div>;
}
