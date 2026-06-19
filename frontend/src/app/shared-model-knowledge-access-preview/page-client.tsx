"use client";

import { SharedModelKnowledgeAccessPreviewPanel } from "@/lib/codexforge/shared-model-knowledge-access-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SharedModelKnowledgeAccessPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/shared-model-knowledge-access-preview"
      workspaceLabel="Shared Model Knowledge Access Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SharedModelKnowledgeAccessPreviewPanel />
    </CodexForgeAppShell>
  );
}
