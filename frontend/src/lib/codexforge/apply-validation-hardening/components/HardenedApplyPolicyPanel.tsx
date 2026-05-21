"use client";

import type { CSSProperties } from "react";
import type { HardenedApplyPolicy } from "../index";

export function HardenedApplyPolicyPanel({ policy }: { policy: HardenedApplyPolicy }) {
  return (
    <section style={panel} data-codexforge-hardened-apply-policy-panel="HardenedApplyPolicyPanel renders policy blocks missing preview diff policy blocks missing approval policy requires rollback plan no direct apply-diff no direct write-file">
      <div style={header}><span style={eyebrow}>Policy</span><strong>{policy.allowed ? "Allowed" : "Blocked"}</strong></div>
      <h2 style={title}>Apply request policy</h2>
      <p style={copy}>Approval required. Preview diff, touched files, rollback, and validation must be present before request-ready.</p>
      <div style={statusGrid}>
        <Metric label="Request ready" value={policy.requestReady ? "yes" : "no"} />
        <Metric label="Blockers" value={String(policy.blockedReasons.length)} />
        <Metric label="Warnings" value={String(policy.warnings.length)} />
      </div>
      <details style={details}>
        <summary>Policy blockers and warnings</summary>
        <ul style={list}>{[...policy.blockedReasons, ...policy.warnings].map((item) => <li key={`hardened-policy-${item}`}>{item}</li>)}</ul>
      </details>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const statusGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" };
const metric: CSSProperties = { background: "rgba(2,6,23,0.38)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 8 };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const list: CSSProperties = { margin: "8px 0 0", paddingLeft: 18 };
