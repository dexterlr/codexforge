import type { SnapshotRestoreReplayEvidence } from "../index";

export function RestoreReplayEvidencePanel({ evidence }: { evidence: SnapshotRestoreReplayEvidence }) {
  return (
    <section style={panel} data-codexforge-restore-replay-evidence-panel="RestoreReplayEvidencePanel renders replay evidence no event execution no appendEvent no graph mutation">
      <h2 style={heading}>Replay Evidence</h2>
      <p style={muted}>{evidence.replayId} / {evidence.replayMode} / {evidence.replayStatus}</p>
      <div style={grid}>
        <Stat label="Simulated" value={evidence.simulatedEventCount} />
        <Stat label="Blocked" value={evidence.blockedEventCount} />
        <Stat label="Warnings" value={evidence.warningCount} />
        <Stat label="Risks" value={evidence.riskCount} />
        <Stat label="Node delta" value={evidence.nodeDelta} />
        <Stat label="Edge delta" value={evidence.edgeDelta} />
      </div>
      <p style={text}>{evidence.replayRecommendation}</p>
      <p style={muted}>Top risk: {evidence.topRisk}</p>
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
const grid = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 } as const;
const stat = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(15,23,42,0.6)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 10 } as const;
const labelStyle = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText } as const;
const valueStyle = { color: "#ccfbf1", fontSize: 17, lineHeight: 1.2, ...safeText } as const;
const text = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0, ...safeText } as const;
const muted = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText } as const;
