"use client";

import { FirstControlledLaunchEvidenceReviewPanel } from "@/lib/codexforge/first-controlled-launch-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledLaunchEvidenceReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-launch-evidence-review"
      workspaceLabel="First Controlled Launch Evidence Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLaunchEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
