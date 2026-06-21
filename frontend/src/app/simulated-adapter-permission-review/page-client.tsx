"use client";

import { SimulatedAdapterPermissionReviewPanel } from "@/lib/codexforge/simulated-adapter-permission-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterPermissionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-permission-review"
      workspaceLabel="Simulated Adapter Permission Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterPermissionReviewPanel />
    </CodexForgeAppShell>
  );
}
