"use client";

import { AdapterImplementationValidationMatrixPanel } from "@/lib/codexforge/adapter-implementation-validation-matrix/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationValidationMatrixPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-validation-matrix"
      workspaceLabel="Adapter Implementation Validation Matrix"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationValidationMatrixPanel />
    </CodexForgeAppShell>
  );
}
