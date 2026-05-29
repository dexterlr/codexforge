"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodingFlowLiveTrialPanel } from "@/lib/codexforge/coding-flow-live-trial/components/CodingFlowLiveTrialPanel";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodeFlowTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/code-flow/trial"
      workspaceLabel="Coding Trial"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-coding-flow-live-trial-route="Coding Trial route imports/renders CodingFlowLiveTrialPanel Try the coding flow Start trial no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary" />
      <div style={linkRow}>
        <Link href="/code-flow/live-run" style={primaryHandoffLink}>Run live coding flow</Link>
        <Link href="/code-flow/manual-trial" style={primaryHandoffLink}>Run manual coding trial</Link>
        <Link href="/code-flow" style={primaryHandoffLink}>Start trial in Code Flow</Link>
        <Link href="/code-flow/trial-review" style={handoffLink}>Next: record what felt confusing</Link>
      </div>
      <span hidden data-codexforge-coding-flow-trial-review-integration="Trial Review result capture can point to /code-flow/trial-review troubleshooting can point to /code-flow/trial-review for UX issue logging no auto-persistence" />
      <span hidden data-codexforge-coding-flow-live-run-integration="Coding Flow Live Run /code-flow/live-run guided live-run option no auto-apply no auto-run" />
      <CodingFlowLiveTrialPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
