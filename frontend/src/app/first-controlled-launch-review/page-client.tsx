"use client";

import { FirstControlledLaunchReviewPanel } from "@/lib/codexforge/first-controlled-launch-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledLaunchReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-launch-review"
      workspaceLabel="First Controlled Launch Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLaunchReviewPanel />
    </CodexForgeAppShell>
  );
}
