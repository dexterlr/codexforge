"use client";

import { FirstFileWriteAdapterMvpDesignPanel } from "@/lib/codexforge/first-file-write-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstFileWriteAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-file-write-adapter-mvp-design"
      workspaceLabel="First File Write Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstFileWriteAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
