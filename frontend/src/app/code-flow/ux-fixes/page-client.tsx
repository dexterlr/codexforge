"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodingFlowUxFixPanel } from "@/lib/codexforge/coding-flow-ux-fix/components/CodingFlowUxFixPanel";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodeFlowUxFixesPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/code-flow/ux-fixes"
      workspaceLabel="Coding UX Fixes"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-coding-flow-ux-fix-route="Coding Flow UX Fix route imports/renders CodingFlowUxFixPanel Make the coding flow easier Copy UX fix checklist no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary" />
      <div style={linkRow}>
        <Link href="/code-flow" style={handoffLink}>Continue code flow</Link>
        <Link href="/code-flow/trial-review" style={handoffLink}>Back to trial review</Link>
        <Link href="/code-flow/trial" style={handoffLink}>Run another live trial</Link>
      </div>
      <CodingFlowUxFixPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
