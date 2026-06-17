"use client";

import { FirstProjectScaffoldControlledTrialPanel } from "@/lib/codexforge/first-project-scaffold-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstProjectScaffoldControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-project-scaffold-controlled-trial"
      workspaceLabel="First Project Scaffold Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstProjectScaffoldControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
