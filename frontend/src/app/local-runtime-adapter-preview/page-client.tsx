"use client";

import { LocalRuntimeAdapterPreviewPanel } from "@/lib/codexforge/local-runtime-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-adapter-preview"
      workspaceLabel="Local Runtime Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
