"use client";

import { ModelPrivacyLocalityPolicyPreviewPanel } from "@/lib/codexforge/model-privacy-locality-policy-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelPrivacyLocalityPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-privacy-locality-policy-preview"
      workspaceLabel="Model Privacy Locality Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelPrivacyLocalityPolicyPreviewPanel />
    </CodexForgeAppShell>
  );
}
