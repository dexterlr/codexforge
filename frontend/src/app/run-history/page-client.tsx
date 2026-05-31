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
      <span hidden data-codexforge-run-history-route="Run History route imports/renders RunHistoryTimeline Review history Review latest run useful empty state compact filters not a debug event log Coding Trial trial run kind Review recent work capture handoffs and decide what to do next no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <div style={linkRow}>
        <Link href="/code-flow/release-audit" style={primaryHandoffLink}>Next: release audit</Link>
        <Link href="/code-flow/successful-run" style={handoffLink}>Record success</Link>
        <Link href="/code-flow/real-trial" style={handoffLink}>Real trial records</Link>
        <Link href="/workflow-results" style={handoffLink}>Capture result</Link>
      </div>
      <span hidden data-codexforge-run-history-trial-review="Run History references Trial Review trial-review run kind/filter link to trial review no auto-persistence Coding Flow Trial Review" />
      <span hidden data-codexforge-run-history-mvp="Run History references Coding Flow Live Run /code-flow/live-run Coding Flow Live Manual Trial /code-flow/manual-trial Real Manual MVP Trial /code-flow/real-trial First Successful Coding Run /code-flow/successful-run manual trial records MVP Working Path /code-flow/mvp-path Coding Flow MVP Release Audit /code-flow/release-audit apply evidence as run detail validation result capture as run detail" />
      <RunHistoryTimeline />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
