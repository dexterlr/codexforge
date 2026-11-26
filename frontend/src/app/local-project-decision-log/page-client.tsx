"use client";

import { LocalProjectDecisionLogReviewPanel } from "@/lib/codexforge/local-project-decision-log-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProjectMemoryPanel } from "@/lib/codexforge/brain/learning/components/ProjectMemoryPanel";

export default function LocalProjectDecisionLogPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-project-decision-log"
      workspaceLabel="Decision Log"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectMemoryPanel />
      <details style={{ marginTop: 16 }}>
        <summary style={{ cursor: "pointer", paddingBlock: 8 }}>Example decision reviews</summary>
        <LocalProjectDecisionLogReviewPanel />
      </details>
    </CodexForgeAppShell>
  );
}
