"use client";

import { AdapterImplementationAuditReviewPanel } from "@/lib/codexforge/adapter-implementation-audit-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationAuditReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-audit-review"
      workspaceLabel="Adapter Implementation Audit Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationAuditReviewPanel />
    </CodexForgeAppShell>
  );
}
