import type { CSSProperties } from "react";
import type { StepRunnerApprovalPacket } from "../step-runner-preview-types";

export function StepRunnerApprovalPacketPanel({
  packet,
}: {
  packet: StepRunnerApprovalPacket;
}) {
  return (
    <section
      style={panel}
      data-codexforge-step-runner-approval-packet-panel="StepRunnerApprovalPacketPanel renders approval packet no-run guarantee Future run requires approval"
    >
      <div style={eyebrow}>Approval Packet</div>
      <h2 style={heading}>{packet.proposedAction}</h2>
      <div style={grid}>
        <Metric label="Packet" value={packet.id} />
        <Metric label="Tool posture" value={packet.proposedToolPosture} />
        <Metric label="Risk" value={packet.riskLevel} />
        <Metric label="Future run" value="blocked until approval" />
      </div>
      <div style={guarantee}>
        <strong>{packet.noRunGuarantee}</strong>
        <span>{packet.noFileMutationGuarantee}</span>
      </div>
      <ListBlock label="Required approvals" values={packet.requiredApprovals} empty="No approvals declared." />
      <ListBlock
        label="Approval checklist"
        values={packet.approvalChecklist.map((item) => item.label)}
        empty="No checklist declared."
      />
      <p style={body}>{packet.operatorNote}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
    </div>
  );
}

function ListBlock({
  label,
  values,
  empty,
}: {
  label: string;
  values: string[];
  empty: string;
}) {
  return (
    <div style={listBlock}>
      <strong style={blockTitle}>{label}</strong>
      <ul style={list}>
        {(values.length > 0 ? values : [empty]).map((value) => (
          <li key={value} style={item}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#facc15", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, lineHeight: 1.25, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const metricValue: CSSProperties = { color: "#e0f2fe", fontSize: 13, overflowWrap: "anywhere" };
const guarantee: CSSProperties = { border: "1px solid rgba(248,113,113,0.30)", background: "rgba(127,29,29,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 5, color: "#fecaca", fontSize: 12, lineHeight: 1.45, minWidth: 0, overflowWrap: "anywhere" };
const listBlock: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
