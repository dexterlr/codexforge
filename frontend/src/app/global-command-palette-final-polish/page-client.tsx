"use client";

import { GlobalCommandPaletteFinalPolishPanel } from "@/lib/codexforge/global-command-palette-final-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/global-command-palette-final-polish"
      workspaceLabel="Command Palette Polish"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GlobalCommandPaletteFinalPolishPanel />
    </CodexForgeAppShell>
  );
}
