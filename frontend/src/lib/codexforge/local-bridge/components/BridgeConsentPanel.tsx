"use client";

import type { CSSProperties } from "react";
import { buildBridgeSessionReactKey, type BridgeConsentBoundary } from "@/lib/codexforge/local-bridge";

export function BridgeConsentPanel({ boundary }: { boundary: BridgeConsentBoundary }) {
  return (
    <section style={panel} data-codexforge-bridge-consent-panel="BridgeConsentPanel renders">
      <div style={header}>
        <span style={eyebrow}>Consent runtime</span>
        <strong style={badge}>explicit session consent required</strong>
      </div>
      <h2 style={title}>Consent boundary</h2>
      <div style={rules}>
        {boundary.rules.map((rule) => (
          <article key={buildBridgeSessionReactKey("consent", rule.id)} style={ruleCard}>
            <div style={ruleTop}>
              <strong>{rule.label}</strong>
              <span style={rule.allowedInPreview ? okPill : blockPill}>{rule.status}</span>
            </div>
            <p style={copy}>{rule.reason}</p>
            <p style={requirement}>{rule.futureRequirement}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(59,130,246,0.18)", background: "rgba(6,11,28,0.82)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(96,165,250,0.34)", color: "#bfdbfe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const rules: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 10 };
const ruleCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const ruleTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap" };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45 };
const requirement: CSSProperties = { margin: 0, color: "#e0f2fe", fontSize: 12, lineHeight: 1.45 };
const okPill: CSSProperties = { border: "1px solid rgba(52,211,153,0.32)", color: "#bbf7d0", borderRadius: 7, padding: "4px 7px", fontSize: 11, fontWeight: 900 };
const blockPill: CSSProperties = { border: "1px solid rgba(251,113,133,0.32)", color: "#fecdd3", borderRadius: 7, padding: "4px 7px", fontSize: 11, fontWeight: 900 };
