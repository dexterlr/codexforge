"use client";

import { GuardedDomainHandoffPreviewPanel } from "@/lib/codexforge/guarded-domain-handoff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedDomainHandoffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-domain-handoff-preview"
      workspaceLabel="Guarded Domain Handoff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedDomainHandoffPreviewPanel />
    </CodexForgeAppShell>
  );
}
