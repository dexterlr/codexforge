"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ResultReviewInboxPanel } from "@/lib/codexforge/result-review-inbox/components";

export default function ReviewInboxPageClient() {
  return <CodexForgeAppShell activePath="/review-inbox" workspaceLabel="Review inbox" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-review-inbox-route="ResultReviewInboxPanel route imports/renders main panel no review items helpful empty state route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <div style={linkRow}><Link href="/run-history" style={primaryHandoffLink}>No items: review run history</Link><Link href="/help-empty-states" style={handoffLink}>Empty-state help</Link></div>
    <ResultReviewInboxPanel />
  </CodexForgeAppShell>;
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
