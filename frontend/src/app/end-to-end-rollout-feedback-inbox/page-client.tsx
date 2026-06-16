"use client";

import { EndToEndRolloutFeedbackInboxPanel } from "@/lib/codexforge/end-to-end-rollout-feedback-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndRolloutFeedbackInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-rollout-feedback-inbox"
      workspaceLabel="E2E Feedback"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndRolloutFeedbackInboxPanel />
    </CodexForgeAppShell>
  );
}
