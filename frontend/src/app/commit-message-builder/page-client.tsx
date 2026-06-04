"use client";

import { CommitMessageBuilderPanel } from "@/lib/codexforge/commit-message-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommitMessageBuilderPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/commit-message-builder"
      workspaceLabel="Commit Draft"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommitMessageBuilderPanel />
    </CodexForgeAppShell>
  );
}
