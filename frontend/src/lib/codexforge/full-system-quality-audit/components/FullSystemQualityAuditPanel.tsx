"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { summarizeQualityAuditSession, type FullSystemQualityAuditSession } from "../index";
import { QualityAuditCheckPanel } from "./QualityAuditCheckPanel";
import { QualityAuditEmptyState } from "./QualityAuditEmptyState";
import { QualityAuditFindingPanel } from "./QualityAuditFindingPanel";
import { QualityAuditFixPlanPanel } from "./QualityAuditFixPlanPanel";
import { QualityAuditRouteMapPanel } from "./QualityAuditRouteMapPanel";
import { QualityAuditSafetyReviewPanel } from "./QualityAuditSafetyReviewPanel";
import { QualityAuditSafetyStrip } from "./QualityAuditSafetyStrip";
import { QualityAuditSmokeReviewPanel } from "./QualityAuditSmokeReviewPanel";
import { QualityAuditUpgradeSummaryPanel } from "./QualityAuditUpgradeSummaryPanel";

type Props = { session: FullSystemQualityAuditSession };

export function FullSystemQualityAuditPanel({ session }: Props) {
  const [copied, setCopied] = useState(false);
  const auditSummary = useMemo(() => summarizeQualityAuditSession(session), [session]);

  function copyAuditSummary() {
    void navigator.clipboard?.writeText(auditSummary).then(() => setCopied(true)).catch(() => setCopied(false));
  }

  return (
    <main style={shell} data-codexforge-quality-audit-panel="FullSystemQualityAuditPanel renders System quality audit Copy audit summary no giant raw JSON above fold advanced details collapsed or visually secondary no unsafe execution buttons">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Full system quality audit</span>
          <h1 style={headline}>System quality audit</h1>
          <p style={lede}>Check bugs, routes, safety, smokes, and the coding MVP path.</p>
          <QualityAuditSafetyStrip />
        </div>
        <div style={actionBox}>
          <button type="button" onClick={copyAuditSummary} style={primaryButton}>Copy audit summary</button>
          <span style={actionNote}>{copied ? "Copied." : "Copy-only handoff. No unsafe buttons."}</span>
        </div>
      </section>

      <QualityAuditEmptyState />
      <section style={grid}>
        <QualityAuditFixPlanPanel plan={session.fixPlan} />
        <QualityAuditRouteMapPanel routeMap={session.routeMap} />
        <QualityAuditSafetyReviewPanel review={session.safetyReview} />
        <QualityAuditSmokeReviewPanel review={session.smokeReview} />
        <QualityAuditCheckPanel checks={session.checks} />
        <QualityAuditFindingPanel findings={session.findings} />
        <QualityAuditUpgradeSummaryPanel summary={session.upgradeSummary} />
      </section>

      <details style={details}>
        <summary style={summaryStyle}>Advanced details</summary>
        <p style={detailsText}>
          Build and smoke validation remain separate. The audit does not run checks, apply patches, write files, mutate Brain graph, promote memory, or call blocked execution bridges from UI.
        </p>
      </details>
    </main>
  );
}

const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = {
  alignItems: "start",
  background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))",
  border: "1px solid rgba(45,212,191,0.22)",
  borderRadius: 8,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "minmax(0, 1fr) minmax(220px, 300px)",
  minWidth: 0,
  padding: 22,
};
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const actionBox: CSSProperties = { alignContent: "start", display: "grid", gap: 8, minWidth: 0 };
const primaryButton: CSSProperties = { background: "#5eead4", border: "1px solid rgba(94,234,212,0.42)", borderRadius: 8, color: "#021014", cursor: "pointer", fontSize: 13, fontWeight: 900, padding: "10px 12px" };
const actionNote: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", minWidth: 0 };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
const summaryStyle: CSSProperties = { cursor: "pointer", fontSize: 12, fontWeight: 900 };
const detailsText: CSSProperties = { fontSize: 12, lineHeight: 1.5, margin: "8px 0 0" };
