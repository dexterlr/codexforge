"use client";

import { CreativeAdapterPreviewPanel } from "@/lib/codexforge/creative-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-adapter-preview"
      workspaceLabel="Creative Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
