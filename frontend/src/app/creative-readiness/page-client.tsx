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
      workspaceLabel="Real Creative Executor Readiness"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealCreativeExecutorReadinessAudit model={initialData} />
    </CodexForgeAppShell>
  );
}
