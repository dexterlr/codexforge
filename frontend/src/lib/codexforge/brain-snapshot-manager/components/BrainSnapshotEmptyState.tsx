import Link from "next/link";

export function BrainSnapshotEmptyState() {
  return (
    <section data-codexforge-brain-snapshot-empty-state="BrainSnapshotEmptyState renders" style={{ border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 18, display: "grid", gap: 10 }}>
      <strong>No live graph snapshot was supplied.</strong>
      <p style={{ margin: 0, opacity: 0.76, lineHeight: 1.5 }}>
        The manager falls back to deterministic empty snapshot modeling with a visible warning. Use /brain, Runtime Event Journal,
        and Runtime Event Replay to review source context without automatic persistence.
      </p>
      <Link href="/brain" style={{ color: "#7dd3fc", textDecoration: "none" }}>Open Brain graph inspector</Link>
    </section>
  );
}
