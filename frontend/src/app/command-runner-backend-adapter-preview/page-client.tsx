"use client";

import { CommandRunnerBackendAdapterPreviewPanel } from "@/lib/codexforge/command-runner-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-backend-adapter-preview"
      workspaceLabel="Command Runner Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
