"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderPolicyBundlePanel } from "@/lib/codexforge/provider-policy-bundle/components";

export default function ProviderPolicyBundlePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-policy-bundle"
      workspaceLabel="Policy Bundle"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderPolicyBundlePanel />
    </CodexForgeAppShell>
  );
}
