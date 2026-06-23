"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PromptPayloadApprovalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/prompt-payload-approval-preview"
      workspaceLabel="Prompt Payload Approval Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="prompt-payload-approval-preview" />
    </CodexForgeAppShell>
  );
}
