"use client";

import type { CSSProperties } from "react";
import type { ApprovedBrainMergeRequest } from "../approved-brain-merge-types";
import { summarizeApprovedBrainMergeRequest } from "../approved-merge-request";

export function ApprovedMergeRequestPanel({
  request,
  approvalNote,
  onApprovalNoteChange,
  approved,
  onApprovedChange,
}: {
  request: ApprovedBrainMergeRequest;
  approvalNote: string;
  onApprovalNoteChange: (value: string) => void;
  approved: boolean;
  onApprovedChange: (value: boolean) => void;
}) {
  return (
    <section style={panel} data-codexforge-approved-merge-request="before/after summary explicit merge approval required">
      <h3 style={title}>Approved Merge Request</h3>
      <label style={checkRow}>
        <input
          type="checkbox"
          checked={approved}
          onChange={(event) => onApprovedChange(event.target.checked)}
        />
        <span>Explicit merge approval required</span>
      </label>
      <label style={label}>
        Approval note
        <textarea
          value={approvalNote}
          onChange={(event) => onApprovalNoteChange(event.target.value)}
          placeholder="Record why this reviewed graph diff is approved."
          style={textarea}
        />
      </label>
      <div style={grid}>
        <Metric label="Events" value={request.eventIds.length} />
        <Metric label="Node diffs" value={request.nodeDiffs.length + request.nodeUpdateDiffs.length} />
        <Metric label="Edge diffs" value={request.edgeDiffs.length} />
        <Metric label="Approved" value={request.approved ? "yes" : "no"} />
      </div>
      <Summary lines={summarizeApprovedBrainMergeRequest(request)} />
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

function Summary({ lines }: { lines: string[] }) {
  return <ul style={list}>{lines.map((line) => <li key={line}>{line}</li>)}</ul>;
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const checkRow: CSSProperties = { display: "flex", gap: 8, alignItems: "center", color: "#ccfbf1", fontSize: 13, fontWeight: 800, ...safe };
const label: CSSProperties = { display: "grid", gap: 6, color: "#cbd5e1", fontSize: 12, fontWeight: 800, textTransform: "uppercase", ...safe };
const textarea: CSSProperties = { width: "100%", minHeight: 72, resize: "vertical", border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.5)", color: "#f8fafc", borderRadius: 8, padding: 10, font: "inherit", textTransform: "none", ...safe };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0, ...safe };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.55, ...safe };
