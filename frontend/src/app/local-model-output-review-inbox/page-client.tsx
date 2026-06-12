"use client";

import { LocalModelOutputReviewInboxPanel } from "@/lib/codexforge/local-model-output-review-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelOutputReviewInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-output-review-inbox"
      workspaceLabel="Local Output Inbox"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelOutputReviewInboxPanel />
    </CodexForgeAppShell>
  );
}
