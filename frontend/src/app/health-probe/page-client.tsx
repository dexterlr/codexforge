"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { FutureHealthProbeModel } from "@/lib/codexforge/future-guarded-health-probe";
import { FutureGuardedHealthProbePanel } from "@/lib/codexforge/future-guarded-health-probe/components/FutureGuardedHealthProbePanel";

type Props = {
  initialData: FutureHealthProbeModel;
};

export default function HealthProbePageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/health-probe"
      workspaceLabel="Prepare probe"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-health-probe-friendly-copy="Prepare probe metadata-only review No auto-run" />
      <FutureGuardedHealthProbePanel model={initialData} />
    </CodexForgeAppShell>
  );
}
