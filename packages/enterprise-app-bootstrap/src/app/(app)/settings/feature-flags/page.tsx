import { PageHeader } from "@/components/common/page-header";
import { FeatureFlags } from "@/features/settings/feature-flags";

export const metadata = { title: "Feature flags" };
export default function FeatureFlagsPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Delivery" title="Feature flags" description="Activation progressive, expérimentation contrôlée et mécanisme de repli. Les changements doivent être journalisés." /><FeatureFlags /></div>;
}
