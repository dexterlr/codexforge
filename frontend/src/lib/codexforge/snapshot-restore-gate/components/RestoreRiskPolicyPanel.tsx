import type { SnapshotRestorePolicyResult } from "../index";

export function RestoreRiskPolicyPanel({ policy }: { policy: SnapshotRestorePolicyResult }) {
  return (
    <section style={panel} data-codexforge-restore-risk-policy-panel="RestoreRiskPolicyPanel renders restore policy returns allowed false by default requires comparison evidence requires replay evidence requires governance review blocks saveBrainGraph from UI blocks live graph mutation">
      <h2 style={heading}>Risk Policy</h2>
      <div style={grid}>
        <Flag label="Allowed" value={String(policy.allowed)} />
        <Flag label="Request ready" value={String(policy.requestReady)} />
        <Flag label="Live graph mutation blocked" value={String(policy.liveGraphMutationBlocked)} />
        <Flag label="saveBrainGraph from UI blocked" value={String(policy.saveBrainGraphFromUiBlocked)} />
      </div>
      <div style={list}>
        {policy.blockedReasons.map((reason) => <span key={reason} style={blocker}>{reason}</span>)}
      </div>
      <p style={muted}>{policy.nextSafeAction}</p>
    </section>
  );
}

function Flag({ label, value }: { label: string; value: string }) {
  return (
    <div style={flag}>
      <span style={labelStyle}>{label}</span>
      <strong style={valueStyle}>{value}</strong>
    </div>
  );
}

const safeText = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" } as const;
const panel = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(2,6,23,0.56)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 } as const;
const heading = { color: "#fecaca", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText } as const;
const grid = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", minWidth: 0 } as const;
const flag = { border: "1px solid rgba(248,113,113,0.16)", background: "rgba(127,29,29,0.18)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 10 } as const;
const labelStyle = { color: "#fca5a5", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText } as const;
const valueStyle = { color: "#fee2e2", fontSize: 14, lineHeight: 1.25, ...safeText } as const;
const list = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 } as const;
const blocker = { border: "1px solid rgba(248,113,113,0.22)", borderRadius: 8, color: "#fecaca", fontSize: 12, fontWeight: 850, padding: "6px 8px", ...safeText } as const;
const muted = { color: "#fca5a5", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText } as const;
