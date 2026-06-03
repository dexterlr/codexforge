"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { WorkflowCompatibilityCheckerPanel } from "@/lib/codexforge/workflow-compatibility-checker/components";

export default function WorkflowCompatibilityCheckerPageClient() {
  return (
    <CodexForgeAppShell activePath="/workflow-compatibility-checker" workspaceLabel="Compatibility Checker" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <WorkflowCompatibilityCheckerPanel />
    </CodexForgeAppShell>
  );
}
