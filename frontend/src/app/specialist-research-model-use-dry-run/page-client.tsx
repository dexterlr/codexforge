"use client";

import { SpecialistResearchModelUseDryRunPanel } from "@/lib/codexforge/specialist-research-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistResearchModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-research-model-use-dry-run"
      workspaceLabel="Specialist Research Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistResearchModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

