"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { WorkflowTemplateImportShelfPanel } from "@/lib/codexforge/workflow-template-import-shelf/components";

export default function WorkflowTemplateImportShelfPageClient() {
  return (
    <CodexForgeAppShell activePath="/workflow-template-import-shelf" workspaceLabel="Import Shelf" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <WorkflowTemplateImportShelfPanel />
    </CodexForgeAppShell>
  );
}
