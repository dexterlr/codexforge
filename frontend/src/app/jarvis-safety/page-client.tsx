"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { NormalProductFrame, SafetySettingsPanel } from "@/lib/codexforge/normal-product";

// 3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish
// safety workspace placeholder only
export default function JarvisSafetyWorkspacePageClient() {
  return (
    <CodexForgeAppShell activePath="/jarvis-safety" workspaceLabel="Safety and Settings" focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false}>
      <NormalProductFrame
        activePath="/jarvis-safety"
        secondaryActions={[
          { label: "Open Audit", href: "/jarvis-audit" },
          { label: "Developer Diagnostics", href: "/developer-diagnostics-hub-preview" },
        ]}
      >
        <SafetySettingsPanel />
      </NormalProductFrame>
      {/* Historical ownership marker: JarvisUnifiedProductPageClientShell surfaceId="jarvis-safety". */}
    </CodexForgeAppShell>
  );
}
