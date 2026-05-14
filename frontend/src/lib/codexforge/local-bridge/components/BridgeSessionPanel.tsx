"use client";

import type { CSSProperties } from "react";
import { buildBridgeSessionReactKey, type BridgeSession } from "@/lib/codexforge/local-bridge";

export function BridgeSessionPanel({ session }: { session: BridgeSession }) {
  return (
    <section style={panel} data-codexforge-bridge-session-panel="BridgeSessionPanel renders">
      <div style={header}>
        <span style={eyebrow}>Session</span>
        <strong style={badge}>preview-only</strong>
      </div>
      <h2 style={title}>Local bridge session</h2>
      <p style={copy}>{session.operatorPresence.detail}</p>
      <div style={metaGrid}>
        <Metric label="Session id" value={session.id} />
        <Metric label="Presence" value={session.operatorPresence.label} />
        <Metric label="Consent" value={session.consentStatus} />
        <Metric label="Timeout" value={session.timeoutLabel} />
      </div>
      <div style={familyGrid}>
        <div>
          <span style={smallLabel}>Allowed preview families</span>
          <ul style={list}>
            {session.allowedCapabilityFamilies.map((item) => (
              <li key={buildBridgeSessionReactKey("allowed", item)}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <span style={smallLabel}>Blocked control families</span>
          <ul style={list}>
            {session.blockedCapabilityFamilies.map((item) => (
              <li key={buildBridgeSessionReactKey("blocked", item)}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p style={next}>{session.safeNextAction}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(3,10,22,0.82)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(52,211,153,0.3)", color: "#bbf7d0", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", lineHeight: 1.5, fontSize: 14 };
const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.7)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0, overflowWrap: "anywhere" };
const familyGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 12 };
const smallLabel: CSSProperties = { display: "block", color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase", marginBottom: 6 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dbeafe", fontSize: 13, lineHeight: 1.65 };
const next: CSSProperties = { margin: 0, borderTop: "1px solid rgba(148,163,184,0.14)", paddingTop: 10, color: "#a7f3d0", fontWeight: 800, fontSize: 13 };
