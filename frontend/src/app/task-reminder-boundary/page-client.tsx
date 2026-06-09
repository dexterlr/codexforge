"use client";

import { TaskReminderBoundaryReviewPanel } from "@/lib/codexforge/task-reminder-boundary-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TaskReminderBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/task-reminder-boundary"
      workspaceLabel="Task Reminder Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TaskReminderBoundaryReviewPanel />
    </CodexForgeAppShell>
  );
}
