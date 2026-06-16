"use client";

import { DailyBetaActivationFeedbackInboxPanel } from "@/lib/codexforge/daily-beta-activation-feedback-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationFeedbackInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-feedback-inbox"
      workspaceLabel="Activation Feedback"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationFeedbackInboxPanel />
    </CodexForgeAppShell>
  );
}
