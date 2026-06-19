"use client";

import { ModelPrivacyRiskScorePreviewPanel } from "@/lib/codexforge/model-privacy-risk-score-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelPrivacyRiskScorePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-privacy-risk-score-preview"
      workspaceLabel="Model Privacy Risk Score Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelPrivacyRiskScorePreviewPanel />
    </CodexForgeAppShell>
  );
}
