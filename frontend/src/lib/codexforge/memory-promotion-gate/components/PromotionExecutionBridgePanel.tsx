"use client";

import type { MemoryPromotionExecutionBridge } from "../memory-promotion-gate-types";
import { Header, List, Metric, body, panel } from "./PromotionGateInputPanel";

export function PromotionExecutionBridgePanel({ bridge }: { bridge: MemoryPromotionExecutionBridge }) {
  return (
    <section style={panel} data-codexforge-promotion-execution-bridge-panel="PromotionExecutionBridgePanel renders execution remains blocked guarded request preview only no auto-run no appendEvent no graph mutation">
      <Header title="Execution bridge" state={bridge.state} />
      <Metric label="Phase 45 execution" value={bridge.canExecuteInPhase45 ? "allowed" : "blocked"} />
      <p style={body}>{bridge.message}</p>
      <List title="Result contract" items={bridge.resultContract} />
      {bridge.blockedReasons.length > 0 ? <List title="Blocked" items={bridge.blockedReasons} /> : null}
    </section>
  );
}
