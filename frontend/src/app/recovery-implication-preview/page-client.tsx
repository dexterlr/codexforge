"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryImplicationPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/recovery-implication-preview" workspaceLabel="Recovery Implication Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="recovery-implication-preview" />
    </CodexForgeAppShell>
  );
}
