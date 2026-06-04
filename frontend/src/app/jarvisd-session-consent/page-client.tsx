"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdLocalSessionConsentPanel } from "@/lib/codexforge/jarvisd-local-session-consent/components";

export default function JarvisdSessionConsentPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-session-consent"
      workspaceLabel="Jarvisd Session Consent"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdLocalSessionConsentPanel />
    </CodexForgeAppShell>
  );
}
