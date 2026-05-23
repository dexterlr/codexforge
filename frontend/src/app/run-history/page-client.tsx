"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RunHistoryTimeline } from "@/lib/codexforge/run-history/components";

export default function RunHistoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/run-history"
      workspaceLabel="Run history"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true, hasMemoryReview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-run-history-route="Run History route imports/renders RunHistoryTimeline Run history Coding Trial trial run kind Review recent work, capture handoffs, and decide what to do next no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <div style={linkRow}>
        <Link href="/code-flow/trial" style={handoffLink}>Coding Trial: prepare trial run handoff</Link>
        <Link href="/code-flow/trial-review" style={handoffLink}>Trial Review: capture go/no-go</Link>
      </div>
      <span hidden data-codexforge-run-history-trial-review="Run History references Trial Review trial-review run kind/filter link to trial review no auto-persistence Coding Flow Trial Review" />
      <RunHistoryTimeline />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
