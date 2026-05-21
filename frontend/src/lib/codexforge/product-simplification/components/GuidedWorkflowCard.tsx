"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { GuidedWorkflow } from "../product-simplification-types";
import { SimplifiedSafetyBadge } from "./SimplifiedSafetyBadge";

export function GuidedWorkflowCard({ workflow }: { workflow: GuidedWorkflow }) {
  const firstRoute = workflow.routeTargets[0] ?? "/start";
  return (
    <article style={card} data-codexforge-guided-workflow-card="GuidedWorkflowCard renders guided workflow essentials first advanced details secondary">
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <h3 style={title}>{workflow.title}</h3>
          <p style={body}>{workflow.description}</p>
        </div>
        <Link href={firstRoute} style={link}>
          {workflow.primaryAction}
        </Link>
      </div>
      <ol style={steps}>
        {workflow.steps.map((step, index) => (
          <li key={`workflow-${workflow.id}-${step.id}`} style={stepItem}>
            <span style={stepNumber}>{index + 1}</span>
            <Link href={step.route} style={stepLink}>{step.label}</Link>
          </li>
        ))}
      </ol>
      <div style={badgeRow}>
        <SimplifiedSafetyBadge label="Review first" />
        <SimplifiedSafetyBadge label="No auto-run" />
      </div>
      <details style={details}>
        <summary style={summary}>Advanced details</summary>
        <p style={detailText}>{workflow.advancedDetailsSummary}</p>
        <p style={detailText}>{workflow.safetySummary}</p>
      </details>
    </article>
  );
}

const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.5)", borderRadius: 8, display: "grid", gap: 12, padding: 14 };
const top: CSSProperties = { alignItems: "start", display: "grid", gap: 10, gridTemplateColumns: "minmax(0, 1fr) auto" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.25, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: "6px 0 0" };
const link: CSSProperties = { border: "1px solid rgba(45,212,191,0.34)", borderRadius: 8, color: "#ccfbf1", fontSize: 12, fontWeight: 900, padding: "9px 10px", textDecoration: "none", whiteSpace: "nowrap" };
const steps: CSSProperties = { display: "grid", gap: 7, listStyle: "none", margin: 0, padding: 0 };
const stepItem: CSSProperties = { alignItems: "center", display: "flex", gap: 8, minWidth: 0 };
const stepNumber: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900 };
const stepLink: CSSProperties = { color: "#e0f2fe", fontSize: 13, fontWeight: 800, textDecoration: "none" };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7 };
const details: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.12)", paddingTop: 10 };
const summary: CSSProperties = { color: "#bfdbfe", cursor: "pointer", fontSize: 12, fontWeight: 900 };
const detailText: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: "8px 0 0" };
