"use client";

import type { CSSProperties } from "react";
import type { PatchPreviewQueuePolicy } from "../patch-preview-queue-types";

export function PatchPreviewQueuePolicyPanel({ policy }: { policy: PatchPreviewQueuePolicy }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-queue-policy-panel="PatchPreviewQueuePolicyPanel renders policy blocks apply policy blocks mutation policy requires reviewed fix recommendation policy requires target file policy marks low confidence as investigation-needed or blocked"
    >
      <h3 style={title}>Queue policy</h3>
      <div style={grid}>
        <PolicyFlag label="Patch preview" value={policy.patchPreviewAllowed ? "allowed" : "blocked"} />
        <PolicyFlag label="Apply" value={policy.applyBlocked ? "blocked" : "open"} />
        <PolicyFlag label="Mutation" value={policy.mutationBlocked ? "blocked" : "open"} />
        <PolicyFlag label="Commands" value={policy.commandExecutionBlocked ? "blocked" : "open"} />
      </div>
      <ul style={list}>
        {policy.summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function PolicyFlag({ label, value }: { label: string; value: string }) {
  return (
    <span style={flag}>
      <strong>{label}</strong>
      {value}
    </span>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 9, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8 };
const flag: CSSProperties = { border: "1px solid rgba(45,212,191,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 3, fontSize: 11, color: "#ccfbf1", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
