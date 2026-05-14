"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCapabilityDescriptor, CodexForgeCapabilityReadiness } from "../capability-types";
import { buildCodexForgeCapabilityReactKey } from "../capability-types";

type CapabilityCardGridProps = {
  capabilities: CodexForgeCapabilityDescriptor[];
  readiness: CodexForgeCapabilityReadiness[];
};

export function CapabilityCardGrid({ capabilities, readiness }: CapabilityCardGridProps) {
  return (
    <section data-codexforge-capability-map style={panel}>
      <div style={sectionHeader}>
        <div>
          <div style={eyebrow}>Capability map</div>
          <h2 style={title}>Operator-controlled capability surface</h2>
        </div>
      </div>
      <div style={grid}>
        {capabilities.map((capability, index) => {
          const item = readiness.find((entry) => entry.id === capability.id);
          return (
            <article
              key={buildCodexForgeCapabilityReactKey("capability-card", [capability.id], index)}
              style={card}
              data-codexforge-capability-card={capability.id}
            >
              <div style={cardTop}>
                <h3 style={cardTitle}>{capability.label}</h3>
                <span style={statusBadge(capability.status)}>{capability.status}</span>
              </div>
              <p style={body}>{capability.summary}</p>
              <div style={badgeRow}>
                <span style={riskBadge(capability.riskLevel)}>{capability.riskLevel} risk</span>
                <span style={softBadge}>{capability.operatorMode}</span>
                <span style={approvalBadge(capability.consent)}>{capability.consent}</span>
              </div>
              <div style={miniGrid}>
                <Metric label="Readiness" value={String(item?.score ?? 0)} />
                <Metric label="Adapters" value={String(item?.adapterCount ?? capability.adapters.length)} />
              </div>
              <div style={nextBox}>
                <strong>Safe next action</strong>
                <span>{item?.safeNextAction ?? capability.nextMilestones[0]}</span>
              </div>
            </article>
          );
        })}
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

function statusBadge(status: string): CSSProperties {
  if (status === "available") return { ...badge, borderColor: "rgba(52,211,153,0.35)", background: "rgba(52,211,153,0.12)", color: "#bbf7d0" };
  if (status === "blocked") return { ...badge, borderColor: "rgba(251,113,133,0.38)", background: "rgba(251,113,133,0.12)", color: "#fecdd3" };
  return { ...badge, borderColor: "rgba(251,191,36,0.35)", background: "rgba(251,191,36,0.12)", color: "#fde68a" };
}

function riskBadge(risk: string): CSSProperties {
  if (risk === "critical") return { ...badge, borderColor: "rgba(251,113,133,0.42)", background: "rgba(251,113,133,0.14)", color: "#fecdd3" };
  if (risk === "high") return { ...badge, borderColor: "rgba(251,146,60,0.38)", background: "rgba(251,146,60,0.12)", color: "#fed7aa" };
  if (risk === "medium") return { ...badge, borderColor: "rgba(251,191,36,0.34)", background: "rgba(251,191,36,0.10)", color: "#fde68a" };
  return { ...badge, borderColor: "rgba(34,211,238,0.34)", background: "rgba(34,211,238,0.10)", color: "#cffafe" };
}

function approvalBadge(consent: string): CSSProperties {
  if (consent === "blocked") return riskBadge("critical");
  if (consent === "explicit-session-consent") return riskBadge("high");
  if (consent === "approval-required") return riskBadge("medium");
  return statusBadge("available");
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
};
const sectionHeader: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", opacity: 0.62 };
const title: CSSProperties = { margin: "4px 0 0", fontSize: 18, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10 };
const card: CSSProperties = { minWidth: 0, border: "1px solid rgba(255,255,255,0.11)", background: "rgba(0,0,0,0.18)", borderRadius: 8, padding: 12, display: "grid", gap: 10 };
const cardTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 15, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.78, overflowWrap: "anywhere" };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const badge: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7, padding: "5px 7px", fontSize: 11, fontWeight: 800, textTransform: "uppercase" };
const softBadge: CSSProperties = { ...badge, background: "rgba(255,255,255,0.06)", color: "#e5e7eb" };
const miniGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, padding: 8, display: "grid", gap: 3, fontSize: 11 };
const nextBox: CSSProperties = { borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
