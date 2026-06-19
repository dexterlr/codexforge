"use client";

import { SpecialistCodingModelUseDryRunPanel } from "@/lib/codexforge/specialist-coding-model-use-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistCodingModelUseDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-coding-model-use-dry-run"
      workspaceLabel="Specialist Coding Model Use Dry-Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistCodingModelUseDryRunPanel />
    </CodexForgeAppShell>
  );
}

