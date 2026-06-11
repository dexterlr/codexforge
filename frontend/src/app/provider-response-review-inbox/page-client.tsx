"use client";

import { ProviderResponseReviewInboxPanel } from "@/lib/codexforge/provider-response-review-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderResponseReviewInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-response-review-inbox"
      workspaceLabel="Response Inbox"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderResponseReviewInboxPanel />
    </CodexForgeAppShell>
  );
}
