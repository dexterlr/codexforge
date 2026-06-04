"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdSecretsRedactionGatePanel } from "@/lib/codexforge/jarvisd-secrets-redaction-gate/components";

export default function JarvisdSecretsRedactionPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-secrets-redaction"
      workspaceLabel="Jarvisd Secrets Redaction"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdSecretsRedactionGatePanel />
    </CodexForgeAppShell>
  );
}
