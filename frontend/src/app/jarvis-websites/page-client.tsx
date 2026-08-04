"use client";

import { WebsiteCreatorPanel } from "@/lib/codexforge/creator/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function JarvisWebsitesWorkspacePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvis-websites"
      workspaceLabel="Jarvis Static Website Creator"
      contentMaxWidth="standard"
      showRightRail={false}
      showRightRailRouteGroups={false}
      pageDensity="focus"
    >
      <WebsiteCreatorPanel />
    </CodexForgeAppShell>
  );
}
