"use client";

import { RemoteProviderCredentialBoundaryReviewPanel } from "@/lib/codexforge/remote-provider-credential-boundary-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RemoteProviderCredentialBoundaryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/remote-provider-credential-boundary-review"
      workspaceLabel="Credential Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RemoteProviderCredentialBoundaryReviewPanel />
    </CodexForgeAppShell>
  );
}
