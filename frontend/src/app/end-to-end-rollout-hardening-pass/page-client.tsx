"use client";

import { EndToEndRolloutHardeningPassPanel } from "@/lib/codexforge/end-to-end-rollout-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndRolloutHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-rollout-hardening-pass"
      workspaceLabel="E2E Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndRolloutHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
