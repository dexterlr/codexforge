"use client";

import { ModelHealthProbePreviewPanel } from "@/lib/codexforge/model-health-probe-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelHealthProbePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-health-probe-preview"
      workspaceLabel="Model Health Probe Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelHealthProbePreviewPanel />
    </CodexForgeAppShell>
  );
}
