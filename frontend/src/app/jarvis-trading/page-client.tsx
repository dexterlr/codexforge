"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { NormalProductFrame, TradingResearchPanel } from "@/lib/codexforge/normal-product";

// 3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish
// trading workspace has dedicated polished page
export default function JarvisTradingWorkspacePageClient() {
  return (
    <CodexForgeAppShell activePath="/jarvis-trading" workspaceLabel="Trading research" focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false}>
      <NormalProductFrame
        activePath="/jarvis-trading"
        secondaryActions={[
          { label: "Review Audit", href: "/jarvis-audit" },
          { label: "Review Safety", href: "/jarvis-safety" },
        ]}
      >
        <TradingResearchPanel />
      </NormalProductFrame>
      {/* Historical ownership marker: JarvisUnifiedProductPageClientShell surfaceId="jarvis-trading". */}
    </CodexForgeAppShell>
  );
}
