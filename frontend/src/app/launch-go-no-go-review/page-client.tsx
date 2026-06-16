"use client";

import { LaunchGoNoGoReviewPanel } from "@/lib/codexforge/launch-go-no-go-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LaunchGoNoGoReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/launch-go-no-go-review"
      workspaceLabel="Launch Go/No-Go Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LaunchGoNoGoReviewPanel />
    </CodexForgeAppShell>
  );
}
