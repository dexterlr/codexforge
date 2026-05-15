"use client";

import type { CSSProperties } from "react";
import { summarizeApplyRollbackGate, type ApplyRollbackGate } from "../index";

type Props = {
  gate: ApplyRollbackGate;
};

export function ApplyRollbackGatePanel({ gate }: Props) {
  return (
    <section style={card} data-codexforge-apply-rollback-gate="ApplyRollbackGatePanel renders rollback plan required">
      <span style={eyebrow}>Rollback Gate</span>
      <h3 style={title}>Rollback acknowledgement required</h3>
      <ul style={list}>{summarizeApplyRollbackGate(gate).map((item) => <li key={item}>{item}</li>)}</ul>
      <ul style={list}>{gate.notes.map((note) => <li key={note}>{note}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,146,60,0.22)", background: "rgba(124,45,18,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fdba74", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ffedd5", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
