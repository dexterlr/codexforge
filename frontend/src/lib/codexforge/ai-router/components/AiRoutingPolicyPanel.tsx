"use client";

import type { CSSProperties } from "react";
import type { AiRoutingPolicy } from "../ai-router-types";
import { summarizeAiRoutingPolicy } from "../ai-routing-policy";

export function AiRoutingPolicyPanel({ policy }: { policy: AiRoutingPolicy }) {
  return (
    <section style={panel}>
      <span style={eyebrow}>Routing policy</span>
      <h2 style={title}>{summarizeAiRoutingPolicy(policy)}</h2>
      <div style={grid}>
        {policy.rules.map((rule) => (
          <div key={rule} style={ruleCard}>{rule}</div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 };
const ruleCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, padding: 10, color: "rgba(226,232,240,0.78)", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, margin: 0, letterSpacing: 0, overflowWrap: "anywhere" };
