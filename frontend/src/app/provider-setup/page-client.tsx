"use client";

import { ProviderSetupWizardPanel } from "@/lib/codexforge/provider-setup-wizard/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderSetupPageClient() {
  return (
    <CodexForgeAppShell activePath="/provider-setup" workspaceLabel="Provider Setup" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProviderSetupWizardPanel />
    </CodexForgeAppShell>
  );
}

