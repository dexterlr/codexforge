"use client";

import type { CSSProperties } from "react";
import type { CreativeJobApprovalPacket } from "../creative-local-bridge-types";

export function CreativeJobApprovalPanel({ approval }: { approval: CreativeJobApprovalPacket }) {
  const rows = [
    ["Approved", String(approval.approved)],
    ["Adapter", String(approval.acknowledgedAdapter)],
    ["Side effects", String(approval.acknowledgedSideEffects)],
    ["Artifact path", String(approval.acknowledgedArtifactPath)],
    ["Local app", String(approval.acknowledgedLocalAppRequirement)],
    ["No automatic execution", String(approval.acknowledgedNoAutomaticExecution)],
    ["Cancellation limits", String(approval.acknowledgedCancellationRollbackLimitations)],
    ["Latest-message authority", String(approval.acknowledgedLatestMessageAuthority)],
  ];
  return (
    <section style={card} data-codexforge-creative-job-approval-panel="CreativeJobApprovalPanel renders approval packet defaults approved false">
      <span style={eyebrow}>Approval</span>
      <strong>Approval Packet Preview</strong>
      <p style={copy}>{approval.approvalNote}</p>
      <div style={grid}>
        {rows.map(([label, value], index) => <div key={`creative-approval-${index}-${label}`} style={row}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,113,133,0.22)", background: "rgba(38,10,24,0.75)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fda4af", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { margin: 0, color: "#fecdd3", lineHeight: 1.5 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(251,113,133,0.16)", borderRadius: 8, padding: 9, display: "grid", gap: 4, minWidth: 0, overflowWrap: "anywhere" };
