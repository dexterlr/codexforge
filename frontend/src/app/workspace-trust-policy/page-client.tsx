"use client";

import { LocalWorkspaceTrustPolicyPanel } from "@/lib/codexforge/local-workspace-trust-policy/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkspaceTrustPolicyPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workspace-trust-policy"
      workspaceLabel="Workspace Trust"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalWorkspaceTrustPolicyPanel />
    </CodexForgeAppShell>
  );
}
