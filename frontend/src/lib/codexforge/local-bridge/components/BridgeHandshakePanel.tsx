"use client";

import type { CSSProperties } from "react";
import { buildBridgeSessionReactKey, type BridgeHandshakePreview } from "@/lib/codexforge/local-bridge";

export function BridgeHandshakePanel({ handshake }: { handshake: BridgeHandshakePreview }) {
  return (
    <section style={panel} data-codexforge-bridge-handshake-panel="BridgeHandshakePanel renders">
      <div style={header}>
        <span style={eyebrow}>Handshake preview</span>
        <strong style={badge}>{handshake.mode}</strong>
      </div>
      <h2 style={title}>{handshake.adapterFamily} adapter handshake</h2>
      <div style={steps}>
        {handshake.steps.map((step, index) => (
          <article key={buildBridgeSessionReactKey("handshake", step.id)} style={stepCard}>
            <span style={stepNumber}>{index + 1}</span>
            <div style={stepBody}>
              <div style={stepTop}>
                <strong>{step.label}</strong>
                <span style={step.safe ? safe : blocked}>{step.status}</span>
              </div>
              <p style={copy}>{step.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(129,140,248,0.2)", background: "rgba(10,12,31,0.84)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(196,181,253,0.32)", color: "#ddd6fe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const steps: CSSProperties = { display: "grid", gap: 8 };
const stepCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: 10, display: "grid", gridTemplateColumns: "32px minmax(0, 1fr)", gap: 10, alignItems: "start" };
const stepNumber: CSSProperties = { width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 999, background: "rgba(34,211,238,0.14)", color: "#a5f3fc", fontWeight: 900 };
const stepBody: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const stepTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap" };
const safe: CSSProperties = { color: "#bbf7d0", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const blocked: CSSProperties = { color: "#fecdd3", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45 };
