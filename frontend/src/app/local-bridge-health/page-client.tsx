"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { LocalBridgeHealthModel } from "@/lib/codexforge/local-bridge-health";
import { LocalBridgeHealthPanel } from "@/lib/codexforge/local-bridge-health/components/LocalBridgeHealthPanel";

type Props = {
  initialData: LocalBridgeHealthModel;
};

export default function LocalBridgeHealthPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/local-bridge-health"
      workspaceLabel="Check setup"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-local-bridge-health-friendly-copy="Check setup Add setup details to check local tool readiness No auto-run" />
      <LocalBridgeHealthPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
