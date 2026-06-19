"use client";

import { SharedModelBrainContextContractPanel } from "@/lib/codexforge/shared-model-brain-context-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SharedModelBrainContextContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/shared-model-brain-context-contract"
      workspaceLabel="Shared Model Brain Context Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SharedModelBrainContextContractPanel />
    </CodexForgeAppShell>
  );
}
