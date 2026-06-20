"use client";

import { BuilderIntentClarifierPreviewPanel } from "@/lib/codexforge/builder-intent-clarifier-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderIntentClarifierPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-intent-clarifier-preview"
      workspaceLabel="Builder Intent Clarifier Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderIntentClarifierPreviewPanel />
    </CodexForgeAppShell>
  );
}
