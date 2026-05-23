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
        <Link href="/code-flow/trial" style={handoffLink}>Coding Trial: guided live trial checklist</Link>
        <Link href="/code-flow/trial-review" style={handoffLink}>Trial Review: capture go/no-go</Link>
        <Link href="/apply-validation" style={handoffLink}>Apply Validation Hardening: apply safely, then validate</Link>
        <Link href="/workflow-results" style={handoffLink}>Workflow Results: prepare reviewed handoff</Link>
        <Link href="/run-history" style={handoffLink}>Run History: review completed runs</Link>
      </div>
      <span hidden data-codexforge-code-flow-workflow-results="Coding Trial Try guided trial result step can link to /workflow-results completion can prepare result record handoff passing/failing status can route through workflow results completion/result step can link to /run-history no auto-persistence Workflow Results Run History" />
      <span hidden data-codexforge-code-flow-trial-review="Coding Flow references Trial Review /code-flow/trial-review manual trial run review notes friction pass/fail checklist go/no-go no auto-persistence" />
      <RealCodingFlowPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
