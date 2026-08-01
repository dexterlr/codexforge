"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyExecutionBridge, ApprovedPatchApplyExecutionResult } from "../index";

export function ApplyExecutionBridgePanel({
  bridge,
  result,
  disabled,
  disabledReason,
  onRequest,
}: {
  bridge: ApprovedPatchApplyExecutionBridge;
  result: ApprovedPatchApplyExecutionResult | null;
  disabled: boolean;
  disabledReason?: string;
  onRequest: () => void;
}) {
  return (
    <section style={panel} data-codexforge-apply-execution-bridge-panel="ApplyExecutionBridgePanel renders execution bridge has request-ready or blocked state execution bridge does not execute on render">
      <div style={header}>
        <h3 style={title}>Execution bridge</h3>
        <button
          type="button"
          style={button}
          disabled={disabled}
          aria-describedby="approved-patch-apply-bridge-status"
          title={disabled ? disabledReason : undefined}
          onClick={onRequest}
        >
          Request guarded apply
        </button>
      </div>
      <div id="approved-patch-apply-bridge-status" style={strip}>
        Status: {bridge.status} | Guarded API: {String(bridge.guardedApiAvailable)}
        {disabled && disabledReason ? ` | ${disabledReason}` : ""}
      </div>
      <ul style={list}>{bridge.summary.map((item) => <li key={item}>{item}</li>)}</ul>
      {result ? <div style={resultBox}>Result: {result.status}. Applied: {String(result.applied)}.</div> : null}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(196,181,253,0.32)", background: "rgba(196,181,253,0.14)", borderRadius: 8, color: "#ede9fe", cursor: "pointer", fontSize: 11, fontWeight: 900, padding: "7px 8px" };
const strip: CSSProperties = { color: "#bfdbfe", fontSize: 12, fontWeight: 800, overflowWrap: "anywhere" };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
const resultBox: CSSProperties = { border: "1px solid rgba(52,211,153,0.18)", background: "rgba(52,211,153,0.08)", borderRadius: 8, color: "#bbf7d0", fontSize: 12, padding: 8 };
