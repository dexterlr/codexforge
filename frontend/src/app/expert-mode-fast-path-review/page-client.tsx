"use client";

import { ExpertModeFastPathReviewPanel } from "@/lib/codexforge/expert-mode-fast-path-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExpertModeFastPathReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/expert-mode-fast-path-review"
      workspaceLabel="Expert Fast Path"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ExpertModeFastPathReviewPanel />
    </CodexForgeAppShell>
  );
}
