export function BrainSnapshotSafetyNotice() {
  return (
    <section
      data-codexforge-brain-snapshot-safety-notice="BrainSnapshotSafetyNotice renders read-only no graph mutation no snapshot restore in Phase 50 no appendEvent no saveBrainGraph from UI canonical graph schema preserve latest-message authority"
      style={{
        border: "1px solid rgba(251,191,36,0.26)",
        background: "rgba(120,53,15,0.18)",
        borderRadius: 8,
        padding: 16,
        lineHeight: 1.55,
        overflowWrap: "anywhere",
      }}
    >
      Brain Snapshot Manager is read-only. No graph mutation. No snapshot restore in Phase 50. No appendEvent.
      No saveBrainGraph from UI. No command execution. Canonical graph schema is visible, and preserve latest-message authority.
    </section>
  );
}
