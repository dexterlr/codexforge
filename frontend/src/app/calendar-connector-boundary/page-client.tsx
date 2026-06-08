"use client";

import { CalendarConnectorBoundaryReviewPanel } from "@/lib/codexforge/calendar-connector-boundary-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CalendarConnectorBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/calendar-connector-boundary"
      workspaceLabel="Calendar Connector Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CalendarConnectorBoundaryReviewPanel />
    </CodexForgeAppShell>
  );
}
