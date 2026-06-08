"use client";

import { ExtensionSandboxBoundaryReviewPanel } from "@/lib/codexforge/extension-sandbox-boundary-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExtensionSandboxBoundaryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/extension-sandbox-boundary-review"
      workspaceLabel="Extension Sandbox Boundary Review"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ExtensionSandboxBoundaryReviewPanel />
    </CodexForgeAppShell>
  );
}
