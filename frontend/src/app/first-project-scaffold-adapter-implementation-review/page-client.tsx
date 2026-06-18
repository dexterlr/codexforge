"use client";

import { FirstProjectScaffoldAdapterImplementationReviewPanel } from "@/lib/codexforge/first-project-scaffold-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstProjectScaffoldAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-project-scaffold-adapter-implementation-review"
      workspaceLabel="First Project Scaffold Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstProjectScaffoldAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
