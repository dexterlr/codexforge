"use client";

import { SecureCredentialStrategyPanel } from "@/lib/codexforge/secure-credential-strategy/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CredentialsPageClient() {
  return (
    <CodexForgeAppShell activePath="/credentials" workspaceLabel="Credential Strategy" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <SecureCredentialStrategyPanel />
    </CodexForgeAppShell>
  );
}

