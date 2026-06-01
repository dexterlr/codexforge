"use client";

import type { CSSProperties } from "react";
import type { LocalVideoWorkflow } from "../local-video-workflow-types";
import { LocalVideoWorkflowRequirementPanel } from "./LocalVideoWorkflowRequirementPanel";
import { LocalVideoWorkflowRiskPanel } from "./LocalVideoWorkflowRiskPanel";
import { LocalVideoWorkflowRoutingPanel } from "./LocalVideoWorkflowRoutingPanel";
import { LocalVideoWorkflowStepPanel } from "./LocalVideoWorkflowStepPanel";

export function LocalVideoWorkflowPanel({ workflow }: { workflow: LocalVideoWorkflow }) {
  return <article style={card}><h2 style={title}>{workflow.title}</h2><p style={copy}>{workflow.whenToUse}</p><LocalVideoWorkflowStepPanel steps={workflow.steps} /><LocalVideoWorkflowRequirementPanel requirements={workflow.requirements} /><LocalVideoWorkflowRiskPanel risks={workflow.risks} /><LocalVideoWorkflowRoutingPanel routing={workflow.routing} /></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
