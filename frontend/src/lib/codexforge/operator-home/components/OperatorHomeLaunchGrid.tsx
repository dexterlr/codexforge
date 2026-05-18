"use client";

import type { CSSProperties } from "react";
import type { OperatorHomeLauncher } from "../operator-home-types";
import { buildOperatorHomeStableKey } from "../operator-home-types";
import { OperatorHomeLaunchCard } from "./OperatorHomeLaunchCard";

type OperatorHomeLaunchGridProps = {
  launcher: OperatorHomeLauncher;
};

export function OperatorHomeLaunchGrid({ launcher }: OperatorHomeLaunchGridProps) {
  return (
    <section
      style={section}
      data-codexforge-operator-home-launch-grid="OperatorHomeLaunchGrid renders AI Workspace Brain Files Stabilization Creative Capabilities"
    >
      <div style={sectionHeader}>
        <span style={eyebrow}>Launch grid</span>
        <h2 style={heading}>Command surfaces</h2>
      </div>

      <div style={groupStack}>
        {launcher.groups.map((group) => (
          <div key={buildOperatorHomeStableKey("launch-group", group.id)} style={groupPanel}>
            <div style={groupHeader}>
              <h3 style={groupTitle}>{group.label}</h3>
              <p style={groupDescription}>{group.description}</p>
            </div>
            <div style={grid}>
              {group.cards.map((card) => (
                <OperatorHomeLaunchCard
                  key={buildOperatorHomeStableKey("launch-card", group.id, card.id)}
                  card={card}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const section: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.42)",
  borderRadius: 8,
  display: "grid",
  gap: 14,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

const sectionHeader: CSSProperties = {
  display: "grid",
  gap: 4,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#5eead4",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  ...safeText,
};

const heading: CSSProperties = {
  fontSize: 22,
  margin: 0,
  ...safeText,
};

const groupStack: CSSProperties = {
  display: "grid",
  gap: 14,
  minWidth: 0,
};

const groupPanel: CSSProperties = {
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const groupHeader: CSSProperties = {
  display: "grid",
  gap: 3,
  minWidth: 0,
};

const groupTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 16,
  margin: 0,
  ...safeText,
};

const groupDescription: CSSProperties = {
  color: "#94a3b8",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  ...safeText,
};

const grid: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  minWidth: 0,
};
