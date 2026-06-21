"use client";

import { FileWriteOperatorReviewPacketPanel } from "@/lib/codexforge/file-write-operator-review-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteOperatorReviewPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-operator-review-packet"
      workspaceLabel="File Write Operator Review Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteOperatorReviewPacketPanel />
    </CodexForgeAppShell>
  );
}
