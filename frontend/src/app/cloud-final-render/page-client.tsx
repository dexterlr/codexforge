"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CloudFinalRenderReviewPanel } from "@/lib/codexforge/cloud-final-render-review/components";

export default function CloudFinalRenderPageClient() {
  return (
    <CodexForgeAppShell activePath="/cloud-final-render" workspaceLabel="Cloud Final Render" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CloudFinalRenderReviewPanel />
    </CodexForgeAppShell>
  );
}
