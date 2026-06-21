"use client";

import { CommandAllowlistPolicyPanel } from "@/lib/codexforge/command-allowlist-policy/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandAllowlistPolicyPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-allowlist-policy"
      workspaceLabel="Command Allowlist Policy"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandAllowlistPolicyPanel />
    </CodexForgeAppShell>
  );
}
