"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PromptPayloadPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/prompt-payload-preview"
      workspaceLabel="Prompt Payload Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="prompt-payload-preview" />
    </CodexForgeAppShell>
  );
}
