"use client";

import type { CSSProperties } from "react";
import { buildCapabilityApprovalBoundary } from "../capability-policy";
import type { CodexForgeCapabilityDescriptor } from "../capability-types";
import { buildCodexForgeCapabilityReactKey } from "../capability-types";

export function ApprovalBoundaryPanel({ capabilities }: { capabilities: CodexForgeCapabilityDescriptor[] }) {
  return (
    <section data-codexforge-approval-boundary-panel style={panel}>
      <div style={eyebrow}>Approval boundaries</div>
      <div style={grid}>
        {capabilities.map((capability, index) => {
          const boundary = buildCapabilityApprovalBoundary(capability);
          return (
            <article
              key={buildCodexForgeCapabilityReactKey("approval", [boundary.capabilityId], index)}
              style={card(boundary.blocked)}
            >
              <div style={top}>
                <strong>{boundary.title}</strong>
                <span style={boundary.blocked ? blocked : badge}>{boundary.blocked ? "blocked" : boundary.required ? "approval" : "ready"}</span>
              </div>
              <p style={text}>{boundary.operatorMessage}</p>
              <p style={muted}>{boundary.neverAllowedInCockpit.join(" / ")}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function card(blockedState: boolean): CSSProperties {
  return { border: blockedState ? "1px solid rgba(251,113,133,0.35)" : "1px solid rgba(255,255,255,0.09)", background: blockedState ? "rgba(251,113,133,0.08)" : "rgba(0,0,0,0.15)", borderRadius: 8, padding: 10, display: "grid", gap: 6, minWidth: 0 };
}

const panel: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", opacity: 0.62 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 8 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", fontSize: 13 };
const text: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, opacity: 0.82 };
const muted: CSSProperties = { margin: 0, fontSize: 11, lineHeight: 1.4, opacity: 0.62, overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.32)", background: "rgba(251,191,36,0.10)", color: "#fde68a", borderRadius: 7, padding: "4px 6px", fontSize: 10, fontWeight: 800, textTransform: "uppercase" };
const blocked: CSSProperties = { ...badge, borderColor: "rgba(251,113,133,0.36)", background: "rgba(251,113,133,0.12)", color: "#fecdd3" };
