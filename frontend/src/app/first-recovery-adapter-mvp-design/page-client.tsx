"use client";

import { FirstRecoveryAdapterMvpDesignPanel } from "@/lib/codexforge/first-recovery-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRecoveryAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-recovery-adapter-mvp-design"
      workspaceLabel="First Recovery Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRecoveryAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
