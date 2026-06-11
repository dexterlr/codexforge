"use client";

import { CrossLoopEvidenceTimelinePanel } from "@/lib/codexforge/cross-loop-evidence-timeline/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CrossLoopEvidenceTimelinePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cross-loop-evidence-timeline"
      workspaceLabel="Evidence Timeline"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CrossLoopEvidenceTimelinePanel />
    </CodexForgeAppShell>
  );
}
