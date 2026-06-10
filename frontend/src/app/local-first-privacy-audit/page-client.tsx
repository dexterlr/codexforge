"use client";

import { LocalFirstPrivacyAuditPanel } from "@/lib/codexforge/local-first-privacy-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalFirstPrivacyAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-first-privacy-audit"
      workspaceLabel="Privacy Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalFirstPrivacyAuditPanel />
    </CodexForgeAppShell>
  );
}
