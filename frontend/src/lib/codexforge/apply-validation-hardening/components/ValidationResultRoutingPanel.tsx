"use client";

import type { CSSProperties } from "react";
import type { ValidationResultRouting } from "../index";

export function ValidationResultRoutingPanel({ routing }: { routing: ValidationResultRouting }) {
  return (
    <section style={panel} data-codexforge-validation-result-routing-panel="ValidationResultRoutingPanel renders result routing maps build fail to closed-loop maps smoke fail to regression triage or closed-loop no auto-fix">
      <div style={header}><span style={eyebrow}>Routing</span><strong>{routing.selectedRoute.label}</strong></div>
      <h2 style={title}>Result routing</h2>
      <p style={copy}>{routing.selectedRoute.detail}</p>
      <details style={details}>
        <summary>Routing table</summary>
        <ul style={list}>{routing.routes.map((route) => <li key={`result-route-${route.id}`}>{route.condition}: {route.label}</li>)}</ul>
      </details>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const list: CSSProperties = { margin: "8px 0 0", paddingLeft: 18 };
