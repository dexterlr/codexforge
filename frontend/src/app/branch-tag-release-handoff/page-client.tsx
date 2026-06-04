"use client";

import { BranchTagReleaseHandoffPanel } from "@/lib/codexforge/branch-tag-release-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BranchTagReleaseHandoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/branch-tag-release-handoff"
      workspaceLabel="Branch Tag Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BranchTagReleaseHandoffPanel />
    </CodexForgeAppShell>
  );
}
