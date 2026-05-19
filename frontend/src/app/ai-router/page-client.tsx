"use client";

import { AiRouterCockpit } from "@/lib/codexforge/ai-router/components/AiRouterCockpit";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AiRouterPageClient() {
  return (
    <CodexForgeAppShell activePath="/ai-router" workspaceLabel="AI Router" nextActionContext={{ wantsOperatorOverview: false }}>
      <AiRouterCockpit />
    </CodexForgeAppShell>
  );
}
