"use client";

import { AgentMemoryRagPatternReviewPanel } from "@/lib/codexforge/agent-memory-rag-pattern-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AgentMemoryRagPatternReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/agent-memory-rag-pattern-review"
      workspaceLabel="Agent Memory RAG Pattern Review"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AgentMemoryRagPatternReviewPanel />
    </CodexForgeAppShell>
  );
}
