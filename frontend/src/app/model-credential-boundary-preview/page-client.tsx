"use client";

import { ModelCredentialBoundaryPreviewPanel } from "@/lib/codexforge/model-credential-boundary-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelCredentialBoundaryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-credential-boundary-preview"
      workspaceLabel="Model Credential Boundary Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelCredentialBoundaryPreviewPanel />
    </CodexForgeAppShell>
  );
}
