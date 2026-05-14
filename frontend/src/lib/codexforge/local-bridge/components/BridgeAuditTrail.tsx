"use client";

import type { CSSProperties } from "react";
import { buildBridgeSessionReactKey, type BridgeAuditTrail as BridgeAuditTrailModel } from "@/lib/codexforge/local-bridge";

export function BridgeAuditTrail({ trail }: { trail: BridgeAuditTrailModel }) {
  return (
    <section style={panel} data-codexforge-bridge-audit-trail="BridgeAuditTrail renders">
      <div style={header}>
        <span style={eyebrow}>Audit preview</span>
        <strong style={badge}>no persistent writes</strong>
      </div>
      <h2 style={title}>Deterministic audit trail</h2>
      <div style={timeline}>
        {trail.items.map((item) => (
          <article key={buildBridgeSessionReactKey("audit", item.id)} style={row}>
            <span style={dot} />
            <div style={body}>
              <div style={rowTop}>
                <strong>{item.label}</strong>
                <span style={item.status === "blocked" ? blocked : recorded}>{item.status}</span>
              </div>
              <p style={copy}>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(22,16,8,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", color: "#fef3c7", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const timeline: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { display: "grid", gridTemplateColumns: "14px minmax(0, 1fr)", gap: 10, alignItems: "start" };
const dot: CSSProperties = { width: 10, height: 10, marginTop: 6, borderRadius: 999, background: "#fbbf24", boxShadow: "0 0 0 4px rgba(251,191,36,0.12)" };
const body: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, padding: 10, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap" };
const recorded: CSSProperties = { color: "#bbf7d0", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const blocked: CSSProperties = { color: "#fecdd3", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { margin: "6px 0 0", color: "#e5e7eb", fontSize: 13, lineHeight: 1.45 };
