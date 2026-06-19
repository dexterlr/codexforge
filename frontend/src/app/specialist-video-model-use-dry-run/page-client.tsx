"use client";

import { SpecialistVideoModelUseDryRunPanel } from "@/lib/codexforge/specialist-video-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistVideoModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-video-model-use-dry-run"
      workspaceLabel="Specialist Video Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistVideoModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

