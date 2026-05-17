"use client";

import type { CSSProperties } from "react";
import { summarizeApplyExecutionBridge, type ApplyExecutionBridgePayload } from "../index";

type Props = {
  bridge: ApplyExecutionBridgePayload;
  disabled: boolean;
  dispatching: boolean;
  onDispatch: () => void;
};

export function ExecutionBridgePanel({ bridge, disabled, dispatching, onDispatch }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-execution-bridge="ExecutionBridgePanel renders bridge refuses mutation without approval bridge does not auto-run on render bridge uses existing execute route only if implemented execute route is the guarded boundary"
    >
      <div style={row}>
        <span style={eyebrow}>Execution Bridge</span>
        <span style={bridge.canDispatch ? badgeOk : badgeWarn}>{bridge.bridgeMode}</span>
      </div>
      <h3 style={title}>Local guarded execute boundary</h3>
      <ul style={list}>{summarizeApplyExecutionBridge(bridge).map((item) => <li key={item}>{item}</li>)}</ul>
      {bridge.blockedReasons.length > 0 ? (
        <ul style={warnList}>{bridge.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
      <button type="button" style={disabled ? disabledButton : button} disabled={disabled} onClick={onDispatch}>
        {dispatching ? "Dispatching approved apply request" : "Dispatch approved apply request"}
      </button>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(129,140,248,0.22)", background: "rgba(49,46,129,0.16)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ede9fe", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 12, lineHeight: 1.45 };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere" };
const badgeWarn: CSSProperties = { border: "1px solid rgba(129,140,248,0.3)", background: "rgba(129,140,248,0.12)", borderRadius: 8, padding: "4px 7px", color: "#ddd6fe", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(196,181,253,0.42)", background: "#c4b5fd", color: "#1e1b4b", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const disabledButton: CSSProperties = { ...button, opacity: 0.48, cursor: "not-allowed", background: "rgba(196,181,253,0.22)", color: "#ede9fe" };
