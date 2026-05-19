import Link from "next/link";

export function SnapshotRestoreEmptyState() {
  return (
    <section style={panel} data-codexforge-snapshot-restore-empty-state="SnapshotRestoreEmptyState renders preview-only empty restore gate no graph mutation">
      <h2 style={heading}>No live restore candidate selected</h2>
      <p style={text}>Use Brain Snapshot Manager, Runtime Event Replay, Runtime Event Journal, and Brain Mutation Governance as review context. The gate still blocks restore by default.</p>
      <div style={links}>
        <Link href="/brain-snapshots" style={link}>Brain Snapshot Manager</Link>
        <Link href="/runtime-replay" style={link}>Runtime Replay</Link>
        <Link href="/brain-governance" style={link}>Brain Governance</Link>
      </div>
    </section>
  );
}

const safeText = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" } as const;
const panel = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.5)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 } as const;
const heading = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText } as const;
const text = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0, ...safeText } as const;
const links = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 } as const;
const link = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none", ...safeText } as const;
