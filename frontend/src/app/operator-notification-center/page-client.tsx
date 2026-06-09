"use client";

import { OperatorNotificationCenterShellPanel } from "@/lib/codexforge/operator-notification-center-shell/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OperatorNotificationCenterPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/operator-notification-center"
      workspaceLabel="Operator Notification Center"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OperatorNotificationCenterShellPanel />
    </CodexForgeAppShell>
  );
}
