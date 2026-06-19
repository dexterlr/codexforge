"use client";

import { BackendAdapterOperatorTrialPreviewPanel } from "@/lib/codexforge/backend-adapter-operator-trial-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterOperatorTrialPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-operator-trial-preview"
      workspaceLabel="Backend Adapter Operator Trial Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterOperatorTrialPreviewPanel />
    </CodexForgeAppShell>
  );
}
