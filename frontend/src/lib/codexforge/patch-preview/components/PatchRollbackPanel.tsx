"use client";

import type { CSSProperties } from "react";
import type { CodexForgePatchRollbackPlan } from "../patch-preview-types";

export function PatchRollbackPanel({ plan }: { plan: CodexForgePatchRollbackPlan }) {
  return (
    <section data-codexforge-patch-rollback-panel style={panel}>
      <div style={eyebrow}>Rollback Panel</div>
      <p style={body}>{plan.summary}</p>
      <div style={list}>
        {plan.notes.map((note, index) => (
          <div key={`${note}-${index}`} style={noteItem}>
            {note}
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

const noteItem: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  fontSize: 12,
  lineHeight: 1.45,
  ...textGuard,
};
