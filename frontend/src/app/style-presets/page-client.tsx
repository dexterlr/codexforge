"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { StylePresetLibraryPanel } from "@/lib/codexforge/style-preset-library/components";

export default function StylePresetsPageClient() {
  return (
    <CodexForgeAppShell activePath="/style-presets" workspaceLabel="Style Presets" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <StylePresetLibraryPanel />
    </CodexForgeAppShell>
  );
}
