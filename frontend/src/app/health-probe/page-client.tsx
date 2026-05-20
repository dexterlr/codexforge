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
      workspaceLabel="Future Guarded Health Probe"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FutureGuardedHealthProbePanel model={initialData} />
    </CodexForgeAppShell>
  );
}
