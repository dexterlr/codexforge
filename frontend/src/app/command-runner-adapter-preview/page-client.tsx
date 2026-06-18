"use client";

import { CommandRunnerAdapterPreviewPanel } from "@/lib/codexforge/command-runner-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-adapter-preview"
      workspaceLabel="Command Runner Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
