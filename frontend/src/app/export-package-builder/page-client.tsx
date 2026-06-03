"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ExportPackageBuilderPanel } from "@/lib/codexforge/export-package-builder-mvp/components";

export default function ExportPackageBuilderPageClient() {
  return (
    <CodexForgeAppShell activePath="/export-package-builder" workspaceLabel="Export Package Builder" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ExportPackageBuilderPanel />
    </CodexForgeAppShell>
  );
}
