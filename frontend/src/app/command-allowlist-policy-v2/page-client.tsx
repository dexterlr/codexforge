"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandAllowlistPolicyV2PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-allowlist-policy-v2"
      workspaceLabel="Command Allowlist Policy v2"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="command-allowlist-policy-v2" />
    </CodexForgeAppShell>
  );
}
