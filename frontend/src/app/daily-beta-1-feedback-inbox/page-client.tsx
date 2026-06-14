"use client";

import { DailyBetaOneFeedbackInboxPanel } from "@/lib/codexforge/daily-beta-1-feedback-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneFeedbackInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-feedback-inbox"
      workspaceLabel="Daily Beta 1 Feedback"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneFeedbackInboxPanel />
    </CodexForgeAppShell>
  );
}
