"use client";

import type { CSSProperties } from "react";
import {
  summarizeApplyExecutionGateInput,
  type ApplyExecutionGateInput,
  type ApplyExecutionGateValidation,
} from "../index";

type Props = {
  input: ApplyExecutionGateInput;
  validation: ApplyExecutionGateValidation;
};

export function ExecutionGateInputPanel({ input, validation }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-execution-input="ExecutionGateInputPanel renders deterministic input no clock reads no random ids no file reads"
    >
      <div style={row}>
        <span style={eyebrow}>Execution Gate Input</span>
        <span style={validation.valid ? badgeOk : badgeWarn}>{validation.valid ? "valid" : "blocked"}</span>
      </div>
      <h3 style={title}>Dry-run-clean package input</h3>
      <ul style={list}>{summarizeApplyExecutionGateInput(input).map((item) => <li key={item}>{item}</li>)}</ul>
      {validation.blockedReasons.length > 0 ? (
        <ul style={warnList}>{validation.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
      <p style={meta}>Tool input path: {input.toolInputPreview.path || "missing"}</p>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(96,165,250,0.2)", background: "rgba(30,64,175,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dbeafe", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 12, lineHeight: 1.45 };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900 };
const meta: CSSProperties = { margin: 0, color: "#bfdbfe", fontSize: 12, overflowWrap: "anywhere" };
