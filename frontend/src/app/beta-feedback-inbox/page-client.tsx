"use client";

import { BetaFeedbackInboxPanel } from "@/lib/codexforge/beta-feedback-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaFeedbackInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-feedback-inbox"
      workspaceLabel="Beta Feedback"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaFeedbackInboxPanel />
    </CodexForgeAppShell>
  );
}
