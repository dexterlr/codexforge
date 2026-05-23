"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodingFlowTrialReviewPanel } from "@/lib/codexforge/coding-flow-trial-review/components/CodingFlowTrialReviewPanel";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodeFlowTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/code-flow/trial-review"
      workspaceLabel="Coding Trial Review"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-coding-flow-trial-review-route="Coding Trial Review route imports/renders CodingFlowTrialReviewPanel Review the coding trial Copy trial review no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary" />
      <div style={linkRow}>
        <Link href="/code-flow/ux-fixes" style={primaryHandoffLink}>Next: open UX fixes</Link>
        <Link href="/code-flow/trial" style={handoffLink}>Run another trial</Link>
      </div>
      <CodingFlowTrialReviewPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
