"use client";

import { OperatorPreferencesReviewPanel } from "@/lib/codexforge/operator-preferences-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OperatorPreferencesReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/operator-preferences-review"
      workspaceLabel="Preferences Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <OperatorPreferencesReviewPanel />
    </CodexForgeAppShell>
  );
}
