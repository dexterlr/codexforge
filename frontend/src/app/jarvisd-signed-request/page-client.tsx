"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdSignedRequestContractPanel } from "@/lib/codexforge/jarvisd-signed-request-contract/components";

export default function JarvisdSignedRequestPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-signed-request"
      workspaceLabel="Jarvisd Signed Request"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdSignedRequestContractPanel />
    </CodexForgeAppShell>
  );
}
