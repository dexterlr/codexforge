"use client";

import type { CSSProperties } from "react";
import { summarizePatchApplyPolicy, type PatchApplyPolicy } from "../index";

type Props = {
  policy: PatchApplyPolicy;
};

export function ApplyPolicyPanel({ policy }: Props) {
  return (
    <section style={card} data-codexforge-apply-policy="ApplyPolicyPanel renders pseudo diff alone is not applyable apply-diff requires tool-policy approval">
      <span style={eyebrow}>Apply Policy</span>
      <h3 style={title}>Policy-backed request readiness</h3>
      <ul style={list}>{summarizePatchApplyPolicy(policy).map((item) => <li key={item}>{item}</li>)}</ul>
      <ul style={list}>{policy.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(15,118,110,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45 };
