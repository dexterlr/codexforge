"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultCaptureFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-capture-failure-handling"
      workspaceLabel="Result Capture Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="result-capture-failure-handling" />
    </CodexForgeAppShell>
  );
}
