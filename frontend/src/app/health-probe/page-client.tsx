"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { FutureHealthProbeModel } from "@/lib/codexforge/future-guarded-health-probe";
import { FutureGuardedHealthProbePanel } from "@/lib/codexforge/future-guarded-health-probe/components/FutureGuardedHealthProbePanel";

type Props = {
  initialData: FutureHealthProbeModel;
};

export default function HealthProbePageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/health-probe"
      workspaceLabel="Prepare probe"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-health-probe-friendly-copy="Prepare probe metadata-only review No auto-run" />
      <Link href="/start" style={wizardLink}>Back to wizard: setup local tools flow</Link>
      <FutureGuardedHealthProbePanel model={initialData} />
    </CodexForgeAppShell>
  );
}

const wizardLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, marginBottom: 10, padding: "8px 10px", textDecoration: "none" };
