"use client";

import { ResearchAdapterPreviewPanel } from "@/lib/codexforge/research-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-adapter-preview"
      workspaceLabel="Research Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
