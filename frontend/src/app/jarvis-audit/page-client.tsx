"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { AuditRunsPanel, NormalProductFrame } from "@/lib/codexforge/normal-product";

// 3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish
// audit workspace placeholder only
export default function JarvisAuditWorkspacePageClient() {
  return (
    <CodexForgeAppShell activePath="/jarvis-audit" workspaceLabel="Audit and Runs" focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false}>
      <NormalProductFrame
        activePath="/jarvis-audit"
        secondaryActions={[
          { label: "Browse Files", href: "/files" },
          { label: "Review Validation", href: "/validation" },
        ]}
      >
        <AuditRunsPanel />
      </NormalProductFrame>
      {/* Historical ownership marker: JarvisUnifiedProductPageClientShell surfaceId="jarvis-audit". */}
    </CodexForgeAppShell>
  );
}
