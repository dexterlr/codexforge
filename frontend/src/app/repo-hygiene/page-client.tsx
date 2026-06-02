"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RepoHygienePanel } from "@/lib/codexforge/repo-hygiene/components";

export default function RepoHygienePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/repo-hygiene"
      workspaceLabel="Repo Hygiene"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RepoHygienePanel />
    </CodexForgeAppShell>
  );
}
