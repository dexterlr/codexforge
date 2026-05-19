"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyPreflight } from "../index";

export function ApplyPreflightPanel({ preflight }: { preflight: ApprovedPatchApplyPreflight }) {
  return (
    <section style={panel} data-codexforge-apply-preflight-panel="ApplyPreflightPanel renders preflight checks path traversal binary file absent no broker execution">
      <h3 style={title}>Preflight</h3>
      <div style={strip}>Status: {preflight.overallStatus}</div>
      <div style={checks}>
        {preflight.checks.map((check) => (
          <article key={check.id} style={checkStyle}>
            <strong>{check.label}</strong>
            <span>{check.status}</span>
            <p>{check.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const strip: CSSProperties = { color: "#bfdbfe", fontSize: 12, fontWeight: 800, overflowWrap: "anywhere" };
const checks: CSSProperties = { display: "grid", gap: 6, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))" };
const checkStyle: CSSProperties = { border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#cbd5e1", display: "grid", fontSize: 11, gap: 2, lineHeight: 1.35, minWidth: 0, overflowWrap: "anywhere", padding: 7 };
