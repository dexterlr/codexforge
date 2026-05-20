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
      workspaceLabel="Local Bridge Health"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalBridgeHealthPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
