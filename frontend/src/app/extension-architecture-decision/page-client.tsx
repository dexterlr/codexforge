"use client";

import { CodexForgeExtensionArchitectureDecisionPanel } from "@/lib/codexforge/codexforge-extension-architecture-decision/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExtensionArchitectureDecisionPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/extension-architecture-decision"
      workspaceLabel="CodexForge Extension Architecture Decision"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeExtensionArchitectureDecisionPanel />
    </CodexForgeAppShell>
  );
}
