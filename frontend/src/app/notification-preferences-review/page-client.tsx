"use client";

import { NotificationPreferencesReviewPanel } from "@/lib/codexforge/notification-preferences-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function NotificationPreferencesReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/notification-preferences-review"
      workspaceLabel="Notification Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <NotificationPreferencesReviewPanel />
    </CodexForgeAppShell>
  );
}
