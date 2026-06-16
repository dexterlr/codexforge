"use client";

import { FirstControlledLaunchRecoveryReviewPanel } from "@/lib/codexforge/first-controlled-launch-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledLaunchRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-launch-recovery-review"
      workspaceLabel="First Controlled Launch Recovery Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLaunchRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
