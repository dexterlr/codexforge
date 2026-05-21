"use client";

import type { CSSProperties } from "react";
import type { WizardSafetyBadge } from "../workflow-wizard-types";

export function WizardSafetyStrip({ badges }: { badges: readonly WizardSafetyBadge[] }) {
  return (
    <div style={strip} data-codexforge-wizard-safety-strip="WizardSafetyStrip renders Review first Approval required No auto-run No file writes compact safety badges no giant safety essay">
      {badges.map((badge) => (
        <span key={`wizard-safety-${badge}`} style={badgeStyle}>{badge}</span>
      ))}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const badgeStyle: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, lineHeight: 1.2, padding: "6px 8px" };
