"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { RealCreativeExecutorReadinessModel } from "@/lib/codexforge/real-creative-executor-readiness";
import { RealCreativeExecutorReadinessAudit } from "@/lib/codexforge/real-creative-executor-readiness/components/RealCreativeExecutorReadinessAudit";

type Props = {
  initialData: RealCreativeExecutorReadinessModel;
};

export default function CreativeReadinessPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/creative-readiness"
      workspaceLabel="Audit readiness"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-creative-readiness-friendly-copy="Audit readiness creative executor boundaries Preview only" />
      <RealCreativeExecutorReadinessAudit model={initialData} />
    </CodexForgeAppShell>
  );
}
