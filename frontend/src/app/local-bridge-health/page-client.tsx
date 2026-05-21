"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { LocalBridgeHealthModel } from "@/lib/codexforge/local-bridge-health";
import { LocalBridgeHealthPanel } from "@/lib/codexforge/local-bridge-health/components/LocalBridgeHealthPanel";

type Props = {
  initialData: LocalBridgeHealthModel;
};

export default function LocalBridgeHealthPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/local-bridge-health"
      workspaceLabel="Check setup"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-local-bridge-health-friendly-copy="Check setup Add setup details to check local tool readiness No auto-run" />
      <Link href="/start" style={wizardLink}>Back to wizard: local setup flow</Link>
      <LocalBridgeHealthPanel model={initialData} />
    </CodexForgeAppShell>
  );
}

const wizardLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, marginBottom: 10, padding: "8px 10px", textDecoration: "none" };
