"use client";

import type { CSSProperties } from "react";
import type { OperatorHomeSurface } from "../operator-home-types";
import { buildOperatorHomeStableKey } from "../operator-home-types";

type OperatorHomeSafetyPanelProps = {
  surface: OperatorHomeSurface;
};

export function OperatorHomeSafetyPanel({ surface }: OperatorHomeSafetyPanelProps) {
  return (
    <section
      style={section}
      data-codexforge-operator-home-safety-panel="OperatorHomeSafetyPanel renders local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority broker-execution blocked-policy"
    >
      <span style={eyebrow}>Safety posture</span>
      <h2 style={heading}>Read-only launcher boundary</h2>
      <p style={copy}>
        Operator Home is local-first and operator-safe. It does not execute shell commands, write project files,
        mutate Brain graph, auto-promote memory, auto-merge graph events, auto-run tests, auto-rollback, call
        broker-execution, dispatch apply-diff, or bypass latest-message authority.
      </p>
      <div style={ruleGrid}>
        {surface.principles.map((rule) => (
          <div key={buildOperatorHomeStableKey("safety-rule", rule)} style={ruleItem}>
            {rule}
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
  border: "1px solid rgba(248,113,113,0.22)",
  background: "rgba(127,29,29,0.12)",
  borderRadius: 8,
  display: "grid",
  gap: 11,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

const eyebrow: CSSProperties = {
  color: "#fca5a5",
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
  color: "#fecaca",
  fontSize: 13,
  lineHeight: 1.55,
  margin: 0,
  ...safeText,
};

const ruleGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const ruleItem: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.16)",
  background: "rgba(2,6,23,0.32)",
  borderRadius: 8,
  color: "#fee2e2",
  fontSize: 12,
  lineHeight: 1.45,
  minWidth: 0,
  padding: 10,
  ...safeText,
};
