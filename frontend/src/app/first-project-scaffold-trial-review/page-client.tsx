"use client";

import { FirstProjectScaffoldTrialReviewPanel } from "@/lib/codexforge/first-project-scaffold-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstProjectScaffoldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-project-scaffold-trial-review"
      workspaceLabel="First Project Scaffold Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstProjectScaffoldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
