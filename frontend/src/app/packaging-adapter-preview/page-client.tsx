"use client";

import { PackagingAdapterPreviewPanel } from "@/lib/codexforge/packaging-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-adapter-preview"
      workspaceLabel="Packaging Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
