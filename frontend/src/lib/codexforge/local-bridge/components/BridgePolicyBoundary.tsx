"use client";

import type { CSSProperties } from "react";
import { buildBridgeSessionReactKey, type BridgePolicyBoundary as BridgePolicyBoundaryModel } from "@/lib/codexforge/local-bridge";

export function BridgePolicyBoundary({ boundary }: { boundary: BridgePolicyBoundaryModel }) {
  return (
    <section style={panel} data-codexforge-bridge-policy-boundary="BridgePolicyBoundary renders">
      <div style={header}>
        <span style={eyebrow}>Policy boundary</span>
        <strong style={badge}>enforced</strong>
      </div>
      <h2 style={title}>Bridge safety contract</h2>
      <ul style={list}>
        {boundary.rules.map((rule) => (
          <li key={buildBridgeSessionReactKey("policy", rule.id)} style={item}>
            <strong>{rule.label}</strong>
            <span style={risk}>{rule.risk}</span>
            <p>{rule.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.2)", background: "rgba(24,8,14,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(248,113,113,0.3)", color: "#fecaca", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9 };
const item: CSSProperties = { border: "1px solid rgba(248,113,113,0.14)", background: "rgba(15,23,42,0.5)", borderRadius: 8, padding: 10, display: "grid", gap: 5, color: "#fee2e2", fontSize: 13, lineHeight: 1.45 };
const risk: CSSProperties = { color: "#fbbf24", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
