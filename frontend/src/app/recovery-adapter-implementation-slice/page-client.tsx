"use client";

import { RecoveryAdapterImplementationSlicePanel } from "@/lib/codexforge/recovery-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-adapter-implementation-slice"
      workspaceLabel="Recovery Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
