"use client";

import type { CSSProperties } from "react";
import type { LocalVideoWorkflowRisk } from "../local-video-workflow-types";

export function LocalVideoWorkflowRiskPanel({ risks }: { risks: LocalVideoWorkflowRisk[] }) {
  return <div style={box}><strong>Risks to review</strong>{risks.map((risk) => <p key={risk.id} style={copy}>{risk.label}: {risk.mitigation}</p>)}</div>;
}

const box: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.16)", display: "grid", gap: 6, paddingTop: 10 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
