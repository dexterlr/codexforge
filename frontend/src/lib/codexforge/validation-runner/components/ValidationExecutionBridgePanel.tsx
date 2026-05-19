"use client";

import type { ValidationExecutionBridge, ValidationExecutionResult } from "../index";
import { vrButton, vrCard, vrCopy, vrList, vrPill, vrTitle } from "./ValidationRunnerStyles";

type Props = { bridge: ValidationExecutionBridge; result: ValidationExecutionResult | null; onRequest: () => void; onCopy?: (label: string, value: string) => void };

export function ValidationExecutionBridgePanel({ bridge, result, onRequest, onCopy }: Props) {
  return (
    <section style={vrCard} data-codexforge-validation-execution-bridge-panel="ValidationExecutionBridgePanel renders request-ready manual-only execution bridge does not execute on render no command execution without approval">
      <strong style={vrTitle}>Execution Bridge</strong>
      <span style={vrPill}>{bridge.status}</span>
      <p style={vrCopy}>{bridge.summary.join(" ")}</p>
      <button type="button" style={vrButton} disabled={!bridge.canRequestRun} onClick={onRequest}>Request guarded validation run</button>
      <button type="button" style={vrButton} onClick={() => onCopy?.("validation commands", bridge.copyableCommands.join("\n"))}>Copy approved commands</button>
      {result ? <p style={vrCopy}>Result: {result.status}. {result.summary.join(" ")}</p> : null}
      <ul style={vrList}>{bridge.blockedReasons.map((item) => <li key={item} style={{ ...vrCopy, color: "#fde68a" }}>{item}</li>)}</ul>
    </section>
  );
}
