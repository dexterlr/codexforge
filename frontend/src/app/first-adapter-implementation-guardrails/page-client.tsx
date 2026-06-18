"use client";

import { FirstAdapterImplementationGuardrailsPanel } from "@/lib/codexforge/first-adapter-implementation-guardrails/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAdapterImplementationGuardrailsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-adapter-implementation-guardrails"
      workspaceLabel="First Adapter Implementation Guardrails"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAdapterImplementationGuardrailsPanel />
    </CodexForgeAppShell>
  );
}
