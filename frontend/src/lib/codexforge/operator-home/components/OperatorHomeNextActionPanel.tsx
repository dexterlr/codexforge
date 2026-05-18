"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { OperatorHomeNextActionPlan } from "../operator-home-types";
import { buildOperatorHomeStableKey } from "../operator-home-types";

type OperatorHomeNextActionPanelProps = {
  plan: OperatorHomeNextActionPlan;
  onCopyPrompt: (prompt: string) => void;
};

export function OperatorHomeNextActionPanel({
  plan,
  onCopyPrompt,
}: OperatorHomeNextActionPanelProps) {
  return (
    <section
      style={section}
      data-codexforge-operator-home-next-action-panel="OperatorHomeNextActionPanel renders no auto-fix preserve latest-message authority"
    >
      <div style={header}>
        <span style={eyebrow}>Next safe action</span>
        <h2 style={heading}>{plan.selected.title}</h2>
        <p style={detail}>{plan.selected.detail}</p>
      </div>

      <div style={actions}>
        <Link href={plan.selected.href} style={primaryLink}>
          Open {plan.selected.href}
        </Link>
        <button
          type="button"
          onClick={() => onCopyPrompt(plan.selected.prompt)}
          style={copyButton}
        >
          Copy next prompt handoff
        </button>
      </div>

      <div style={listGrid}>
        <div style={listPanel}>
          <h3 style={listTitle}>Blockers</h3>
          {plan.blockers.length > 0 ? (
            plan.blockers.map((item) => (
              <p key={buildOperatorHomeStableKey("next-blocker", item)} style={line}>
                {item}
              </p>
            ))
          ) : (
            <p style={line}>No blocker input currently selected.</p>
          )}
        </div>
        <div style={listPanel}>
          <h3 style={listTitle}>Warnings</h3>
          {plan.warnings.length > 0 ? (
            plan.warnings.map((item) => (
              <p key={buildOperatorHomeStableKey("next-warning", item)} style={line}>
                {item}
              </p>
            ))
          ) : (
            <p style={line}>No warning input currently selected.</p>
          )}
        </div>
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
  border: "1px solid rgba(45,212,191,0.22)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  display: "grid",
  gap: 14,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

const header: CSSProperties = {
  display: "grid",
  gap: 6,
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

const detail: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.55,
  margin: 0,
  ...safeText,
};

const actions: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
};

const primaryLink: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.36)",
  background: "#5eead4",
  borderRadius: 8,
  color: "#021014",
  fontSize: 12,
  fontWeight: 900,
  padding: "10px 12px",
  textDecoration: "none",
  ...safeText,
};

const copyButton: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(14,165,233,0.1)",
  borderRadius: 8,
  color: "#e0f2fe",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  padding: "10px 12px",
  ...safeText,
};

const listGrid: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  minWidth: 0,
};

const listPanel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(2,6,23,0.42)",
  borderRadius: 8,
  display: "grid",
  gap: 7,
  minWidth: 0,
  padding: 12,
};

const listTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 13,
  margin: 0,
  ...safeText,
};

const line: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  ...safeText,
};
