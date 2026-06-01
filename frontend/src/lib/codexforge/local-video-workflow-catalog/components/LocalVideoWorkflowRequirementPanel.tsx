"use client";

import type { CSSProperties } from "react";
import type { LocalVideoWorkflowRequirement } from "../local-video-workflow-types";

export function LocalVideoWorkflowRequirementPanel({ requirements }: { requirements: LocalVideoWorkflowRequirement[] }) {
  return <div style={box}><strong>Manual requirements</strong>{requirements.map((requirement) => <p key={requirement.id} style={copy}>{requirement.label}: {requirement.manualSetup}</p>)}</div>;
}

const box: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.16)", display: "grid", gap: 6, paddingTop: 10 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
