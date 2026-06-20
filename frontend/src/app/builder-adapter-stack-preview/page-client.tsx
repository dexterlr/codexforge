"use client";

import { BuilderAdapterStackPreviewPanel } from "@/lib/codexforge/builder-adapter-stack-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderAdapterStackPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-adapter-stack-preview"
      workspaceLabel="Builder Adapter Stack Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderAdapterStackPreviewPanel />
    </CodexForgeAppShell>
  );
}
