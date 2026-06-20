"use client";

import { ModelRouterEvidenceCaptureReviewPanel } from "@/lib/codexforge/model-router-evidence-capture-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterEvidenceCaptureReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-evidence-capture-review"
      workspaceLabel="Model Router Evidence Capture Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterEvidenceCaptureReviewPanel />
    </CodexForgeAppShell>
  );
}
