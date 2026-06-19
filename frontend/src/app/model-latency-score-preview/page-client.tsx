"use client";

import { ModelLatencyScorePreviewPanel } from "@/lib/codexforge/model-latency-score-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelLatencyScorePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-latency-score-preview"
      workspaceLabel="Model Latency Score Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelLatencyScorePreviewPanel />
    </CodexForgeAppShell>
  );
}
