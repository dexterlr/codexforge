"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderBudgetGuardrailsPanel } from "@/lib/codexforge/provider-budget-guardrails/components";

export default function ProviderBudgetGuardrailsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-budget-guardrails"
      workspaceLabel="Budget Guardrails"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderBudgetGuardrailsPanel />
    </CodexForgeAppShell>
  );
}
