"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventPolicy } from "../runtime-event-executor-types";

export function RuntimeEventPolicyPanel({ policy }: { policy: RuntimeEventPolicy }) {
  return (
    <section style={panel} data-codexforge-runtime-event-policy-panel="RuntimeEventPolicyPanel renders policy allows memory.promoted only when approved policy blocks missing approval policy blocks unknown event type policy blocks direct UI graph mutation">
      <strong>Runtime Event Policy</strong>
      <p style={text}>{policy.allowed ? "Policy allowed." : policy.blockedReasons.join(", ")}</p>
      <div style={grid}>
        <Mini label="Allowed type" value={policy.eventTypeAllowed ? "yes" : "no"} />
        <Mini label="UI mutation" value="blocked" />
        <Mini label="UI append" value="blocked" />
      </div>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div style={mini}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 };
const mini: CSSProperties = { border: "1px solid rgba(125,211,252,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, fontSize: 11, color: "#cbd5e1", overflowWrap: "anywhere" };
