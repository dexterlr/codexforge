"use client";

import type { CSSProperties } from "react";
import type { LocalVideoWorkflowStep } from "../local-video-workflow-types";

export function LocalVideoWorkflowStepPanel({ steps }: { steps: LocalVideoWorkflowStep[] }) {
  return <ol style={list}>{steps.map((step) => <li key={step.id}><strong>{step.label}:</strong> {step.plainEnglish}</li>)}</ol>;
}

const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0, paddingLeft: 20 };
