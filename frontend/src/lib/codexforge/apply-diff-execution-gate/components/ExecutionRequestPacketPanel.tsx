"use client";

import type { CSSProperties } from "react";
import {
  summarizeApplyExecutionRequestPacket,
  type ApplyExecutionRequestPacket,
  type ApplyExecutionRequestValidation,
} from "../index";

type Props = {
  packet: ApplyExecutionRequestPacket;
  validation: ApplyExecutionRequestValidation;
};

export function ExecutionRequestPacketPanel({ packet, validation }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-execution-request="ExecutionRequestPacketPanel renders request packet uses tool name apply-diff request packet includes approval state request packet includes rollback notes"
    >
      <div style={row}>
        <span style={eyebrow}>Request Packet</span>
        <span style={packet.ready ? badgeOk : badgeWarn}>{packet.ready ? "ready" : "blocked"}</span>
      </div>
      <h3 style={title}>Guarded apply request packet</h3>
      <ul style={list}>{summarizeApplyExecutionRequestPacket(packet).map((item) => <li key={item}>{item}</li>)}</ul>
      <pre style={pre}>
        {JSON.stringify(
          {
            requestId: packet.requestId,
            toolName: packet.toolName,
            targetFiles: packet.targetFiles,
            approvalId: packet.approvalState.approvalId,
            expectedStatus: packet.expectedResultContract.status,
            input: {
              path: packet.toolInputPreview.path,
              dryRun: packet.toolInputPreview.dryRun,
              patchChars: packet.toolInputPreview.patch.length,
            },
          },
          null,
          2
        )}
      </pre>
      {validation.blockedReasons.length > 0 ? (
        <ul style={warnList}>{validation.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,83,45,0.13)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 12, lineHeight: 1.45 };
const pre: CSSProperties = { margin: 0, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.18)", borderRadius: 8, color: "#d1fae5", fontSize: 11, lineHeight: 1.4, padding: 10, overflow: "auto", maxHeight: 220 };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900 };
