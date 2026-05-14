"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCapabilityRoadmapItem } from "../capability-types";
import { buildCodexForgeCapabilityReactKey } from "../capability-types";

export function FeatureRoadmapLane({ roadmap }: { roadmap: CodexForgeCapabilityRoadmapItem[] }) {
  return (
    <section data-codexforge-feature-roadmap-lane style={panel}>
      <div style={eyebrow}>Next milestones</div>
      <div style={lane}>
        {roadmap.map((item, index) => (
          <article key={buildCodexForgeCapabilityReactKey("roadmap", [item.id], index)} style={card}>
            <span style={status}>{item.status}</span>
            <strong>{item.label}</strong>
            <span>{item.nextMilestone}</span>
            <small>{item.safetyGate}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", opacity: 0.62 };
const lane: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8 };
const card: CSSProperties = { display: "grid", gap: 6, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(0,0,0,0.15)", borderRadius: 8, padding: 10, fontSize: 12, lineHeight: 1.45, minWidth: 0, overflowWrap: "anywhere" };
const status: CSSProperties = { fontSize: 10, fontWeight: 900, textTransform: "uppercase", color: "#bfdbfe" };
