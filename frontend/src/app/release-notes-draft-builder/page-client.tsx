"use client";

import { ReleaseNotesDraftBuilderPanel } from "@/lib/codexforge/release-notes-draft-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ReleaseNotesDraftBuilderPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/release-notes-draft-builder"
      workspaceLabel="Release Notes"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseNotesDraftBuilderPanel />
    </CodexForgeAppShell>
  );
}
