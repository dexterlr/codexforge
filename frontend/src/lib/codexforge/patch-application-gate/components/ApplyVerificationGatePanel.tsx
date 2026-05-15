"use client";

import type { CSSProperties } from "react";
import { summarizeApplyVerificationGate, type ApplyVerificationGate } from "../index";

type Props = {
  gate: ApplyVerificationGate;
};

export function ApplyVerificationGatePanel({ gate }: Props) {
  return (
    <section style={card} data-codexforge-apply-verification-gate="ApplyVerificationGatePanel renders current files must be verified">
      <span style={eyebrow}>Verification Gate</span>
      <h3 style={title}>Checks are suggested, not run here</h3>
      <ul style={list}>{summarizeApplyVerificationGate(gate).map((item) => <li key={item}>{item}</li>)}</ul>
      <ul style={list}>{gate.checks.map((check) => <li key={check.id}>{check.commandOrReview}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(74,222,128,0.2)", background: "rgba(20,83,45,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dcfce7", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
