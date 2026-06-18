"use client";

import { AdapterImplementationSandboxReviewPanel } from "@/lib/codexforge/adapter-implementation-sandbox-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationSandboxReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-sandbox-review"
      workspaceLabel="Adapter Implementation Sandbox Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationSandboxReviewPanel />
    </CodexForgeAppShell>
  );
}
