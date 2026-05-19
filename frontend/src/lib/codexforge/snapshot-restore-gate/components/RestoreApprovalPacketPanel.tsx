import type { SnapshotRestoreApprovalPacket, SnapshotRestoreApprovalValidation } from "../index";

export function RestoreApprovalPacketPanel({
  packet,
  validation,
}: {
  packet: SnapshotRestoreApprovalPacket;
  validation: SnapshotRestoreApprovalValidation;
}) {
  return (
    <section style={panel} data-codexforge-restore-approval-packet-panel="RestoreApprovalPacketPanel renders approval packet defaults approved false missing acknowledgements block request readiness">
      <h2 style={heading}>Approval Packet</h2>
      <div style={grid}>
        <Stat label="Approved" value={String(packet.approved)} />
        <Stat label="Acknowledgements" value={String(packet.requestAcknowledgementsReady)} />
        <Stat label="Missing" value={validation.missingAcknowledgements.length} />
      </div>
      <p style={text}>{packet.approvalNote}</p>
      <div style={list}>
        {validation.missingAcknowledgements.map((item) => <span key={item} style={pill}>{item}</span>)}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={stat}>
      <span style={labelStyle}>{label}</span>
      <strong style={valueStyle}>{value}</strong>
    </div>
  );
}

const safeText = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" } as const;
const panel = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(2,6,23,0.56)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 } as const;
const heading = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText } as const;
const grid = { display: "grid", gap: 8, gridTemplateColumns: "repeat(3, minmax(0, 1fr))", minWidth: 0 } as const;
const stat = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(15,23,42,0.6)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 10 } as const;
const labelStyle = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText } as const;
const valueStyle = { color: "#ccfbf1", fontSize: 14, lineHeight: 1.25, ...safeText } as const;
const text = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0, ...safeText } as const;
const list = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 } as const;
const pill = { border: "1px solid rgba(251,191,36,0.24)", borderRadius: 8, color: "#fde68a", fontSize: 12, fontWeight: 850, padding: "6px 8px", ...safeText } as const;
