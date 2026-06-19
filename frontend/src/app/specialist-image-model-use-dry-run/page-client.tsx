"use client";

import { SpecialistImageModelUseDryRunPanel } from "@/lib/codexforge/specialist-image-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistImageModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-image-model-use-dry-run"
      workspaceLabel="Specialist Image Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistImageModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

