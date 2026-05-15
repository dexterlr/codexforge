"use client";

import type { CSSProperties } from "react";
import type { DiffRollbackPlan } from "../preview-diff-composer-types";

type Props = {
  plan: DiffRollbackPlan;
};

export function DiffRollbackPlanPanel({ plan }: Props) {
  return (
    <section style={card} data-codexforge-preview-diff-composer-rollback="DiffRollbackPlanPanel renders git restore git revert">
      <span style={eyebrow}>Rollback Plan</span>
      <ul style={list}>{plan.notes.map((note) => <li key={note}>{note}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(248,113,113,0.18)", background: "rgba(127,29,29,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fee2e2", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
