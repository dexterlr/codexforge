"use client";

import type { CSSProperties } from "react";
import { buildBridgeSessionReactKey, type BridgeAdapterMatrix as BridgeAdapterMatrixModel } from "@/lib/codexforge/local-bridge";

export function BridgeAdapterMatrix({ matrix }: { matrix: BridgeAdapterMatrixModel }) {
  return (
    <section style={panel} data-codexforge-bridge-adapter-matrix="BridgeAdapterMatrix renders">
      <div style={header}>
        <span style={eyebrow}>Adapter matrix</span>
        <strong style={badge}>no external connection</strong>
      </div>
      <h2 style={title}>Bridge adapter families</h2>
      <div style={grid}>
        {matrix.items.map((item) => (
          <article key={buildBridgeSessionReactKey("adapter", item.id)} style={card}>
            <div style={top}>
              <strong>{item.label}</strong>
              <span style={item.readiness === "blocked" ? blocked : pill}>{item.readiness}</span>
            </div>
            <span style={family}>{item.family}</span>
            <dl style={facts}>
              <div><dt>Capability</dt><dd>{item.capability}</dd></div>
              <div><dt>Mode</dt><dd>{item.mode}</dd></div>
              <div><dt>Approval</dt><dd>{item.approvalRequired ? "required" : "not required"}</dd></div>
            </dl>
            <p style={copy}>{item.blockedReason ?? item.nextSafeMilestone}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "rgba(3,10,22,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.3)", color: "#ccfbf1", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap" };
const pill: CSSProperties = { color: "#bfdbfe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const blocked: CSSProperties = { color: "#fecdd3", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const family: CSSProperties = { color: "#94a3b8", fontSize: 12, textTransform: "uppercase", fontWeight: 800 };
const facts: CSSProperties = { margin: 0, display: "grid", gap: 5, color: "#cbd5e1", fontSize: 12 };
const copy: CSSProperties = { margin: 0, color: "#e0f2fe", fontSize: 13, lineHeight: 1.45 };
