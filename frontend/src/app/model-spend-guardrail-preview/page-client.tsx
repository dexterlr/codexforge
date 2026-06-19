"use client";

import { ModelSpendGuardrailPreviewPanel } from "@/lib/codexforge/model-spend-guardrail-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelSpendGuardrailPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-spend-guardrail-preview"
      workspaceLabel="Model Spend Guardrail Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelSpendGuardrailPreviewPanel />
    </CodexForgeAppShell>
  );
}
