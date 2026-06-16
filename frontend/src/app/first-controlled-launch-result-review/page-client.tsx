"use client";

import { FirstControlledLaunchResultReviewPanel } from "@/lib/codexforge/first-controlled-launch-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledLaunchResultReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-launch-result-review"
      workspaceLabel="First Controlled Launch Result Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLaunchResultReviewPanel />
    </CodexForgeAppShell>
  );
}
