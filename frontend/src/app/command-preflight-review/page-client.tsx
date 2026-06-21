"use client";

import { CommandPreflightReviewPanel } from "@/lib/codexforge/command-preflight-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandPreflightReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-preflight-review"
      workspaceLabel="Command Preflight Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandPreflightReviewPanel />
    </CodexForgeAppShell>
  );
}
