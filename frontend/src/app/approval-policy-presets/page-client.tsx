"use client";

import { ApprovalPolicyPresetsPanel } from "@/lib/codexforge/approval-policy-presets/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovalPolicyPresetsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approval-policy-presets"
      workspaceLabel="Approval Presets"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApprovalPolicyPresetsPanel />
    </CodexForgeAppShell>
  );
}
