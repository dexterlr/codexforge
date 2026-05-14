"use client";

import type { CSSProperties } from "react";
import { buildBridgeRunPrompt, buildBridgeSessionReactKey, type BridgeRunHandoff } from "@/lib/codexforge/local-bridge";

export function BridgeRunHandoffPanel({ handoff }: { handoff: BridgeRunHandoff }) {
  const promptLines = buildBridgeRunPrompt(handoff).split("\n");

  return (
    <section style={panel} data-codexforge-bridge-run-handoff-panel="BridgeRunHandoffPanel renders">
      <div style={header}>
        <span style={eyebrow}>Run Center handoff</span>
        <strong style={handoff.blocked ? blocked : badge}>{handoff.approvalState}</strong>
      </div>
      <h2 style={title}>Operator Run Center preview</h2>
      <div style={payloadGrid}>
        <Metric label="Selected adapter" value={handoff.selectedAdapter.label} />
        <Metric label="Capability" value={handoff.previewRunPayload.capability} />
        <Metric label="Mode" value={handoff.previewRunPayload.mode} />
        <Metric label="Action" value={handoff.previewRunPayload.action} />
      </div>
      <div style={checklist}>
        {handoff.validationChecklist.map((item) => (
          <span key={buildBridgeSessionReactKey("handoff-check", item)}>{item}</span>
        ))}
      </div>
      <div style={promptBox} aria-label="Bridge run prompt preview">
        {promptLines.map((line) => (
          <p key={buildBridgeSessionReactKey("handoff-prompt", line)}>{line}</p>
        ))}
      </div>
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

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(3,17,18,0.8)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.3)", color: "#ccfbf1", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const blocked: CSSProperties = { border: "1px solid rgba(251,113,133,0.32)", color: "#fecdd3", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const payloadGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0, overflowWrap: "anywhere", fontSize: 12 };
const checklist: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 8, color: "#d1fae5", fontSize: 12, fontWeight: 800 };
const promptBox: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.7)", borderRadius: 8, padding: 12, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
