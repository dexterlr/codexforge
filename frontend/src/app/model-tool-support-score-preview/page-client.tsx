"use client";

import { ModelToolSupportScorePreviewPanel } from "@/lib/codexforge/model-tool-support-score-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelToolSupportScorePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-tool-support-score-preview"
      workspaceLabel="Model Tool Support Score Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelToolSupportScorePreviewPanel />
    </CodexForgeAppShell>
  );
}
