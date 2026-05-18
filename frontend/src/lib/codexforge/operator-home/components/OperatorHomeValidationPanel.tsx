"use client";

import type { CSSProperties } from "react";
import type { OperatorHomeNextActionPlan } from "../operator-home-types";
import { buildOperatorHomeStableKey } from "../operator-home-types";

type OperatorHomeValidationPanelProps = {
  plan: OperatorHomeNextActionPlan;
  onCopyValidationChecklist: (checklist: string) => void;
};

export function OperatorHomeValidationPanel({
  plan,
  onCopyValidationChecklist,
}: OperatorHomeValidationPanelProps) {
  const checklist = plan.validationCommands.join("\n");

  return (
    <section
      style={section}
      data-codexforge-operator-home-validation-panel="OperatorHomeValidationPanel renders no command execution without approval no file writes without approval"
    >
      <div style={header}>
        <span style={eyebrow}>Validation checklist</span>
        <h2 style={heading}>Manual validation only</h2>
        <p style={copy}>
          Home can copy this checklist. It does not run build, smoke, tests, rollback, apply gates, or shell commands.
        </p>
      </div>
      <button
        type="button"
        onClick={() => onCopyValidationChecklist(checklist)}
        style={copyButton}
      >
        Copy validation checklist
      </button>
      <div style={commandList}>
        {plan.validationCommands.map((command) => (
          <code
            key={buildOperatorHomeStableKey("validation-command", command)}
            style={commandItem}
          >
            {command}
          </code>
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
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

const header: CSSProperties = {
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  ...safeText,
};

const heading: CSSProperties = {
  fontSize: 20,
  margin: 0,
  ...safeText,
};

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  ...safeText,
};

const copyButton: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.24)",
  background: "rgba(14,165,233,0.14)",
  borderRadius: 8,
  color: "#e0f2fe",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  justifySelf: "start",
  padding: "10px 12px",
  ...safeText,
};

const commandList: CSSProperties = {
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const commandItem: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(2,6,23,0.46)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "block",
  fontFamily:
    "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: 11,
  lineHeight: 1.45,
  minWidth: 0,
  padding: 9,
  whiteSpace: "pre-wrap",
  ...safeText,
};
