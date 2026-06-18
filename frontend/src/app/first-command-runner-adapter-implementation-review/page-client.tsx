"use client";

import { FirstCommandRunnerAdapterImplementationReviewPanel } from "@/lib/codexforge/first-command-runner-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCommandRunnerAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-command-runner-adapter-implementation-review"
      workspaceLabel="First Command Runner Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstCommandRunnerAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
