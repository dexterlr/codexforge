"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealWorkflowPackageValidatorPanel } from "@/lib/codexforge/real-workflow-package-validator/components";

export default function WorkflowPackageValidatorPageClient() {
  return (
    <CodexForgeAppShell activePath="/workflow-package-validator" workspaceLabel="Workflow Package Validator" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealWorkflowPackageValidatorPanel />
    </CodexForgeAppShell>
  );
}
