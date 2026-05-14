"use client";

import type { CSSProperties } from "react";
import type { CodexForgePatchTestPlan } from "../patch-preview-types";

export function PatchTestPlanPanel({ plan }: { plan: CodexForgePatchTestPlan }) {
  return (
    <section data-codexforge-patch-suggested-tests-panel style={panel}>
      <div style={eyebrow}>Suggested Tests</div>
      <p style={body}>{plan.summary}</p>
      <div style={list}>
        {plan.suggestedTests.map((test, index) => (
          <div key={`${test}-${index}`} style={testItem}>
            {test}
          </div>
        ))}
      </div>
    </section>
  );
}

const textGuard: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  ...textGuard,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.66,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.82,
  ...textGuard,
};

const list: CSSProperties = {
  display: "grid",
  gap: 8,
  ...textGuard,
};

const testItem: CSSProperties = {
  border: "1px solid rgba(56,189,248,0.22)",
  background: "rgba(56,189,248,0.08)",
  borderRadius: 8,
  padding: 10,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: 11,
  lineHeight: 1.45,
  ...textGuard,
};
