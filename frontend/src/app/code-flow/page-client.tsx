"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealCodingFlowPanel } from "@/lib/codexforge/real-coding-flow/components";

export default function CodeFlowPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/code-flow"
      workspaceLabel="Fix code safely"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-code-flow-route="Code Flow route imports/renders RealCodingFlowPanel Fix code safely Pick a file Preview patch Review before apply Run checks Review result Apply Validation Hardening /apply-validation no auto-apply no auto-run approval required preview first preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <div style={linkRow}>
        <Link href="/apply-validation" style={handoffLink}>Apply Validation Hardening: apply safely, then validate</Link>
        <Link href="/workflow-results" style={handoffLink}>Workflow Results: prepare reviewed handoff</Link>
      </div>
      <span hidden data-codexforge-code-flow-workflow-results="result step can link to /workflow-results completion can prepare result record handoff passing/failing status can route through workflow results no auto-persistence Workflow Results" />
      <RealCodingFlowPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
