"use client";

import { ModelCapabilityRegistryPreviewPanel } from "@/lib/codexforge/model-capability-registry-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelCapabilityRegistryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-capability-registry-preview"
      workspaceLabel="Model Capability Registry Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelCapabilityRegistryPreviewPanel />
    </CodexForgeAppShell>
  );
}
